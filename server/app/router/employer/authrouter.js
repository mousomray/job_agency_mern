const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const authController = require('../../module/auth/controller/empController');
const { EmployeruiAuth } = require('../../middleware/employer_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router); 

namedRouter.get('employerlogin', '/employer/login', authController.loginGet)
namedRouter.post('employerlogincreate', '/employer/logincreate', authController.loginPost)
namedRouter.get('employerlogout', '/employer/logout', authController.logout)
namedRouter.get('employerprofile', '/employer/profile', EmployeruiAuth, authController.profilepage)
namedRouter.get('employerupdatepassword', '/employer/updatepassword', EmployeruiAuth, authController.updatepasswordGet)
namedRouter.post('employerupdatepasswordcreate', '/employer/updatepasswordcreate', EmployeruiAuth, authController.updatepasswordPost) 
namedRouter.get('employerresetpasswordlink', '/employer/resetpasswordlink', authController.resetpasswordlinkGet)
namedRouter.post('employerresetpasswordlinkcreate', '/employer/resetpasswordlinkcreate', authController.resetpasswordlinkPost)
namedRouter.get('employerforgetpassword', '/employer/forgetpassword/:id/:token', authController.forgetPasswordGet)
namedRouter.post('employerforgetpasswordcreate', '/employer/forgetpasswordcreate/:id/:token', authController.forgetPasswordPost)

module.exports = router;  