const AuthRepo = require('../repository/authrepo');
const path = require('path');
const fs = require('fs');
const { comparePassword } = require('../../../middleware/admin_auth/auth');
const adminOTPverify = require('../../../helper/adminOTPverify');
const transporter = require('../../../config/emailtransporter')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

class adminAuthController { 

    //Register form
    async adminRegisterGet(req, res) {
        return res.render('admin_view/adminregister', { user: req.user });
    }

    // Post data in Register form
    async adminRegisterPost(req, res) {
        try {
            const { name, email, password, city } = req.body;
            if (!name || !email || !password || !city || !req.file) {
                return res.status(400).send('All fields are required, including an image.');
            }
            const existingUser = await AuthRepo.findByEmail(email) // Find by email
            if (existingUser) {
                req.flash('err', 'User already exist with this email');
                return res.redirect(generateUrl('register'));
            }
            if (password.length < 8) {
                return res.status(400).send('Password should be at least 8 characters long.');
            }
            // Hash password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userData = {
                ...req.body, password: hashedPassword, role: 'admin', image: req.file.path
            };
            const user = await AuthRepo.createUser(userData); // Save to database
            adminOTPverify(req, user)
            req.flash('sucess', 'Register Successfully OTP sent your email')
            return res.redirect(generateUrl('otpverify'));
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).send('An unexpected error occurred.');
        }
    }

    // verify OTP show form
    async otpVerifyGet(req, res) {
        return res.render('admin_view/otpverify', { user: req.user });
    }

    // verify OTP Post data for verify email for register
    async otpVerifyPost(req, res) {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return res.status(400).send("All fields are required");
            }
            const existingUser = await AuthRepo.findByEmail(email);
            if (!existingUser) {
                req.flash('err', 'This email is not registered')
                return res.redirect(generateUrl('otpverify'));
            }
            if (existingUser.is_verified) {
                req.flash('err', 'This email is already verified')
                return res.redirect(generateUrl('otpverify'));
            }
            const emailVerification = await AuthRepo.findByUserIdOtp(existingUser._id, otp)
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    await adminOTPverify(req, existingUser);
                    req.flash('err', 'Invalid OTP new OTP is successfully sent you email')
                    return res.redirect(generateUrl('otpverify'));
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await adminOTPverify(req, existingUser);
                req.flash('err', 'OTP expired new OTP is successfully sent your email')
                return res.redirect(generateUrl('otpverify'));
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await AuthRepo.deleteVerifyDocument(existingUser._id);
            req.flash('sucess', 'Your Email is Verified')
            return res.redirect(generateUrl('adminlogin'));
        } catch (error) {
            console.error(error);
            req.flash('err', 'Unable to verify email please try again later')
            return res.redirect(generateUrl('otpverify'));
        }
    }

    // For Login form
    async loginGet(req, res) {
        return res.render('admin_view/adminlogin', { user: req.user });
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
                return res.redirect(generateUrl('adminlogin'));
            }
            // Check if user verified
            if (!user.is_verified) {
                req.flash('err', 'User is Not Verified');
                return res.redirect(generateUrl('adminlogin'));
            }

            // Check if the user is an admin
            if (user.role !== 'admin') {
                req.flash('err', "Admin pannel only can access by admin")
                return res.redirect(generateUrl('adminlogin'));
            }

            const isMatch = comparePassword(password, user.password);
            if (!isMatch) {
                req.flash('err', 'Invalid Credential');
                return res.redirect(generateUrl('adminlogin'));
            }
            // Generate a JWT token
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                city: user.city,
                role: user.role,
            }, process.env.ADMIN_API_KEY, { expiresIn: "1d" });

            // Handling token in cookie
            if (token) {
                res.cookie('admin_auth', token);
                req.flash('sucess', 'Login Successfully')
                return res.redirect(generateUrl('adminprofile'));
            } else {
                req.flash('err', 'Something went wrong')
                return res.redirect(generateUrl('adminlogin'));
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
            res.render('admin_view/adminprofile', {
                title: 'Profile Page',
                user: user
            });
        } catch (error) {
            res.status(500).send("Server error");
        }
    };

    // Handle Logout
    async logout(req, res) {
        res.clearCookie('admin_auth');
        req.flash('sucess', 'Logout Successfully')
        return res.redirect(generateUrl('adminlogin'));
    }

    // Add employer get form
    async addEmployerGet(req, res) {
        return res.render('employer_view/addemployer', { user: req.user });
    }


    // Post data in Register form
    async addEmployerPost(req, res) {
        try {
            const { name, email, city } = req.body;
            if (!name || !email || !city || !req.file) {
                return res.status(400).send('All fields are required, including an image.');
            }
            const existingUser = await AuthRepo.findByEmail(email) // Find by email
            if (existingUser) {
                req.flash('err', 'User already exist with this email');
                return res.redirect(generateUrl('addemployerGet'));
            }
            // Generate a random password and hashing 
            const generatedPassword = crypto.randomBytes(4).toString('hex');
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);
            const userData = {
                ...req.body, password: hashedPassword, role: 'employer', image: req.file.path, is_verified: true
            };
            await AuthRepo.createUser(userData); // Save to database
            const mailbody = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Your Account Credentials',
                html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                            <h2 style="text-align: center; color: #4CAF50;">Welcome to Our Platform!</h2>
                            <p>Dear <strong>${name}</strong>,</p>
                            <p>Your account has been successfully created. Below are your credentials:</p>
                            <table style="width: 100%; margin: 10px 0; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Email:</td>
                                    <td style="padding: 10px;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Password:</td>
                                    <td style="padding: 10px;">${generatedPassword}</td>
                                </tr>
                            </table>
                            <p style="color: #555;">To log in and access your dashboard, click the button below:</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="http://localhost:3004/employer/login" 
                                   style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                                   Login to Your Account
                                </a>
                            </div>
                            <p style="color: #888; font-size: 12px;">For security reasons, please update your password after logging in.</p>
                            <p>Best regards,<br>Admin Team</p>
                        </div>
                    `
            }
            await transporter.sendMail(mailbody);
            req.flash('sucess', 'Employer register successfully credential sent employer email');
            return res.redirect(generateUrl('employerList'));
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).send('An unexpected error occurred.');
        }
    }

    // Employer List
    async employerlist(req, res) {
        try {
            const employers = await AuthRepo.fetchEmployer();
            res.render('employer_view/employerlist', { employers, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving employers" });
        }
    }

    // Handle active inactive
    async toggleEmployerActive(req, res) {
        try {
            const employerId = req.params.id;
            const employer = await AuthRepo.findById(employerId);
            if (!employer) {
                return res.status(404).json({ message: "Employer not found" });
            }
            // Toggle status between 'active' and 'inactive'
            employer.status = employer.status === "active" ? "inactive" : "active";
            await employer.save();
            req.flash('sucess', "Active status change sucessfully")
            res.redirect(generateUrl('employerList'));
        } catch (error) {
            console.error(error);
            req.flash('err', "Active status not change")
            res.status(500).json({ message: "Error updating employer status" });
        }
    }

    // Single employer 
    async singleemployer(req, res) {
        const id = req.params.id;
        try {
            const employer = await AuthRepo.findById(id)
            if (!employer) {
                return res.status(404).send('Employer not found');
            }
            res.render('employer_view/editemployer', { employer, user: req.user });
        } catch (error) {
            console.error('Error fetching employer:', error);
            return res.status(500).send('Error fetching employer');
        }
    }

    // Handle PUT or PATCH for update blog 
    async updateemployer(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        if (req.file) {
            const employer = await AuthRepo.findById(id)
            const imagePath = path.resolve(__dirname, '../../../../', employer.image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully:', employer.image);
                    }
                });
            } else {
                console.log('File does not exist:', imagePath);
            }
        }
        // Deleting image from uploads folder end
        try {
            const { name, email, city } = req.body;
            if (!name || !email || !city) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('editemployer', { id }));
            }
            const existingEmployer = await AuthRepo.findById(id)
            if (!existingEmployer) {
                return res.status(404).send('Employer not found.');
            }
            const employerData = {
                name: name.trim(),
                email: email.trim(),
                city: city.trim(),
                image: req.file ? req.file.path : existingEmployer.image,
            };
            // Update the employer
            await AuthRepo.updateemployer(id, employerData)
            console.log(`Employer with ID ${id} updated`);
            req.flash('sucess', 'Employer updated successfully');
            return res.redirect(generateUrl('employerList'));
        } catch (error) {
            console.error('Error updating employer:', error);
            return res.status(500).send('Error updating employer');
        }
    }

    // Handle DELETE for delete product
    async deleteemployer(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        const employer = await AuthRepo.findById(id)
        const imagePath = path.resolve(__dirname, '../../../../', employer.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully:', employer.image);
                }
            });
        } else {
            console.log('File does not exist:', imagePath);
        }
        // Deleting image from uploads folder end
        try {
            await AuthRepo.deleteemployer(id)
            req.flash('sucess', "Employer deleted sucessfully")
            return res.redirect(generateUrl('employerList')); // Redirect product after deleting data
        } catch (error) {
            console.error('Error deleting employer:', error);
            return res.status(500).send('Error deleting employer');
        }
    }

    // this area currently not required......................


    // Show update password form
    async updatepasswordGet(req, res) {
        return res.render('admin_view/updatepassword', { user: req.user });
    } 

    // Update Password post 
    async updatepasswordPost(req, res) {
        try {
            const userId = req.user._id; // Get user ID from token
            const { oldPassword, newPassword, confirmPassword } = req.body;
            if (!oldPassword || !newPassword || !confirmPassword) {
                req.flash('err', "All fields are required")
                return res.redirect(generateUrl('updatepassword'))
            }
            if (newPassword.length < 8) {
                req.flash('err', "Password should be atleast 8 characters long")
                return res.redirect(generateUrl('updatepassword'))
            }
            if (newPassword !== confirmPassword) {
                req.flash('err', "Password don't match")
                return res.redirect(generateUrl('updatepassword'))
            }
            const user = await AuthRepo.findById(userId)
            if (!user) {
                req.flash('err', "User not found")
                return res.redirect(generateUrl('updatepassword'))
            }
            const isMatch = comparePassword(oldPassword, user.password);
            if (!isMatch) {
                req.flash('err', "Old password is incorrect")
                return res.redirect(generateUrl('updatepassword'))
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedNewPassword;
            await user.save();
            req.flash('sucess', 'Password updated successfully')
            return res.redirect(generateUrl('updatepassword'));
        } catch (error) {
            req.flash('err', "Error updating password")
            return res.redirect(generateUrl('updatepassword'))
        }
    }

    // Reset Password UI link for forget password 
    async resetpasswordlinkGet(req, res) {
        return res.render('admin_view/passwordreset', { user: req.user })
    }

    // Reset Password post 
    async resetpasswordlinkPost(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                req.flash('err', 'Email is Required')
                return res.redirect(generateUrl('resetpasswordlink'));
            }
            const user = await AuthRepo.findByEmail(email);
            if (!user) {
                req.flash('err', 'Email doesnot exist')
                return res.redirect(generateUrl('resetpasswordlink'));
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
            return res.redirect(generateUrl('forgetpassword', { id: user._id, token }));
        } catch (error) {
            console.log(error);
            req.flash('err', 'Error something went wrong')
            return res.redirect(generateUrl('resetpasswordlink'));

        }
    }

    // Forget Password get
    async forgetPasswordGet(req, res) {
        const { id, token } = req.params;
        return res.render('admin_view/forgetpassword', { userId: id, token: token, user: req.user });
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
                return res.redirect(generateUrl('forgetpassword', { id, token }));
            }
            // Validate token check 
            const new_secret = user._id + process.env.ADMIN_API_KEY;
            jwt.verify(token, new_secret);

            if (!password || !confirmPassword) {
                req.flash('err', 'New password and confirm password are required')
                return res.redirect(generateUrl('forgetpassword', { id, token }));
            }

            if (password.length < 8) {
                req.flash('err', "Password should be atleast 8 characters long")
                return res.redirect(generateUrl('forgetpassword', { id, token }));
            }

            if (password !== confirmPassword) {
                req.flash('err', 'New password and confirm password are not matched')
                return res.redirect(generateUrl('forgetpassword', { id, token }));
            }
            // Generate salt and hash new password
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);

            // Update user's password
            await AuthRepo.findByIdHashpassword(user._id, newHashPassword);

            // Send success response
            req.flash('sucess', 'Password changes successfully')
            return res.redirect(generateUrl('adminlogin'));

        } catch (error) {
            req.flash('err', 'Error updating password')
            return res.redirect(generateUrl('forgetpassword', { id, token }));
        }
    }

}

module.exports = new adminAuthController();