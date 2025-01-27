const AuthRepo = require('../repository/authrepo');
const path = require('path');
const fs = require('fs');
const { comparePassword } = require('../../../middleware/admin_auth/auth');
const adminOTPverify = require('../../../helper/adminOTPverify');
const transporter = require('../../../config/emailtransporter')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

class empController {

    // For Login form
    async loginGet(req, res) {
        return res.render('employer_view/employerlogin', { user: req.user });
    }

    // For Login
    async loginPost(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send("All fields are required")
            }
            const user = await AuthRepo.findByEmail(email);
            if (!user) {
                req.flash('err', 'User Not Found');
                return res.redirect(generateUrl('employerlogin'));
            }
            // Check if user verified
            if (!user.is_verified) {
                req.flash('err', 'User is Not Verified');
                return res.redirect(generateUrl('employerlogin'));
            }

            // Check if the user is an employer
            if (user.role !== 'employer') {
                req.flash('err', "Employer pannel only can access by employer")
                return res.redirect(generateUrl('employerlogin'));
            }

            if (user.status !== 'active') {
                req.flash("err", "You are not an active user so you can't login");
                return res.redirect(generateUrl('employerlogin'));
            }

            const isMatch = comparePassword(password, user.password);
            if (!isMatch) {
                req.flash('err', 'Invalid Credential');
                return res.redirect(generateUrl('employerlogin'));
            }
            // Generate a JWT token
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                city: user.city,
                role: user.role
            }, process.env.EMPLOYER_API_KEY, { expiresIn: "1d" });

            // Handling token in cookie
            if (token) {
                res.cookie('employer_auth', token);
                req.flash('sucess', 'Login Successfully')
                return res.redirect(generateUrl('employerprofile'));
            } else {
                req.flash('err', 'Something went wrong')
                return res.redirect(generateUrl('employerlogin'));
            }

        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).send('An unexpected error occurred');
        }
    }

    // Dashboard area
    async profilepage(req, res) {
        try {
            const user = req.user;
            console.log("User Data:", user);
            res.render('employer_view/empprofile', {
                title: 'Profile Page',
                user: user
            });
        } catch (error) {
            res.status(500).send("Server error");
        }
    };

    // Handle Logout
    async logout(req, res) {
        res.clearCookie('employer_auth');
        req.flash('sucess', 'Logout Successfully')
        return res.redirect(generateUrl('employerlogin'));
    }

    // Show update password form
    async updatepasswordGet(req, res) {
        return res.render('employer_view/updatepassword', { user: req.user });
    }

    // Update Password post 
    async updatepasswordPost(req, res) {
        try {
            const userId = req.user._id; // Get user ID from token
            const { oldPassword, newPassword, confirmPassword } = req.body;
            if (!oldPassword || !newPassword || !confirmPassword) {
                req.flash('err', "All fields are required")
                return res.redirect(generateUrl('employerupdatepassword'))
            }
            if (newPassword.length < 8) {
                req.flash('err', "Password should be atleast 8 characters long")
                return res.redirect(generateUrl('employerupdatepassword'))
            }
            if (newPassword !== confirmPassword) {
                req.flash('err', "Password don't match")
                return res.redirect(generateUrl('employerupdatepassword'))
            }
            const user = await AuthRepo.findById(userId)
            if (!user) {
                req.flash('err', "User not found")
                return res.redirect(generateUrl('employerupdatepassword'))
            }
            const isMatch = comparePassword(oldPassword, user.password);
            if (!isMatch) {
                req.flash('err', "Old password is incorrect")
                return res.redirect(generateUrl('employerupdatepassword'))
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedNewPassword;
            await user.save();
            req.flash('sucess', 'Password updated successfully')
            return res.redirect(generateUrl('employerupdatepassword'));
        } catch (error) {
            req.flash('err', "Error updating password")
            return res.redirect(generateUrl('employerupdatepassword'))
        }
    }

     // Reset Password UI link for forget password 
     async resetpasswordlinkGet(req, res) {
        return res.render('employer_view/passwordreset', { user: req.user })
    }

    // Reset Password post 
    async resetpasswordlinkPost(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                req.flash('err', 'Email is Required')
                return res.redirect(generateUrl('employerresetpasswordlink'));
            }
            const user = await AuthRepo.findByEmail(email);
            if (!user) {
                req.flash('err', 'Email doesnot exist')
                return res.redirect(generateUrl('employerresetpasswordlink'));
            }
            // Generate token for password reset
            const secret = user._id + process.env.ADMIN_API_KEY;
            const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '5m' });
            console.log("My forget token...", token)
            // Reset Link and this link generate by frontend developer
            // FRONTEND_HOST_FORGETPASSWORD = http://localhost:3004/forgetpassword
            const resetLink = `${process.env.FRONTEND_HOST_FORGETPASSWORD}/${user._id}/${token}`;
            // Send password reset email  
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Password Reset Link",
                // html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">Click here</a> to reset your password.</p>`
                html: 'Your email is sucessfully verified'
            });
            // Send success response
            req.flash('sucess', 'Your email is verified')
            return res.redirect(generateUrl('employerforgetpassword', { id: user._id, token }));
        } catch (error) {
            console.log(error);
            req.flash('err', 'Error something went wrong')
            return res.redirect(generateUrl('employerresetpasswordlink'));

        }
    }

    // Forget Password get
    async forgetPasswordGet(req, res) {
        const { id, token } = req.params;
        return res.render('employer_view/forgetpassword', { userId: id, token: token, user: req.user });
    }

    // Forget Password
    async forgetPasswordPost(req, res) {
        try {
            const { id, token } = req.params;
            const { password, confirmPassword } = req.body;
            const user = await AuthRepo.findById(id)
            console.log("My user...", user)
            if (!user) {
                req.flash('err', 'User Not Found')
                return res.redirect(generateUrl('employerforgetpassword', { id, token }));
            }
            // Validate token check 
            const new_secret = user._id + process.env.ADMIN_API_KEY;
            jwt.verify(token, new_secret);

            if (!password || !confirmPassword) {
                req.flash('err', 'New password and confirm password are required')
                return res.redirect(generateUrl('employerforgetpassword', { id, token }));
            }

            if (password.length < 8) {
                req.flash('err', "Password should be atleast 8 characters long")
                return res.redirect(generateUrl('employerforgetpassword', { id, token }));
            }

            if (password !== confirmPassword) {
                req.flash('err', 'New password and confirm password are not matched')
                return res.redirect(generateUrl('employerforgetpassword', { id, token }));
            }
            // Generate salt and hash new password
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);

            // Update user's password
            await AuthRepo.findByIdHashpassword(user._id, newHashPassword);

            // Send success response
            req.flash('sucess', 'Password changes successfully')
            return res.redirect(generateUrl('employerlogin'));

        } catch (error) {
            req.flash('err', 'Error updating password')
            return res.redirect(generateUrl('employerforgetpassword', { id, token }));
        }
    }
} 

module.exports = new empController();







