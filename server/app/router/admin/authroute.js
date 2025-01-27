const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const authController = require('../../module/auth/controller/controller');
const applicationController = require('../../module/jobapplication/controller/jobAppController')
const { AdminuiAuth } = require('../../middleware/admin_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('adminregister', '/admin/register', authController.adminRegisterGet)
namedRouter.post('adminregistercreate', '/admin/registercreate', uploadImage.single('image'), authController.adminRegisterPost)
namedRouter.get('otpverify', '/admin/otpverify', authController.otpVerifyGet)
namedRouter.post('otpverifycreate', '/admin/otpverifycreate', authController.otpVerifyPost)
namedRouter.get('adminlogin', '/admin/login', authController.loginGet)
namedRouter.post('adminlogincreate', '/admin/logincreate', authController.loginPost)
namedRouter.get('logout', '/admin/logout', authController.logout)
namedRouter.get('adminprofile', '/admin/profile', AdminuiAuth, authController.profilepage)
namedRouter.get('addemployerGet', '/admin/addemployer', AdminuiAuth, authController.addEmployerGet)
namedRouter.post('addemployerPost', '/admin/addemployercreate', AdminuiAuth, uploadImage.single('image'), authController.addEmployerPost)
namedRouter.get('employerList', '/admin/employerlist', AdminuiAuth, authController.employerlist)
namedRouter.get('toggleemployeractive', '/admin/toggleemployeractive/:id', AdminuiAuth, authController.toggleEmployerActive);
namedRouter.get('editemployer', '/admin/editemployer/:id', AdminuiAuth, authController.singleemployer)
namedRouter.post('updateemployer', '/admin/updateemployer/:id', AdminuiAuth, uploadImage.single('image'), authController.updateemployer)
namedRouter.get('deleteemployer', '/admin/deleteemployer/:id', AdminuiAuth, authController.deleteemployer)
namedRouter.get('applicationList', '/admin/application', AdminuiAuth, applicationController.getApplicationList)
namedRouter.get('toggleapplicationactive', '/admin/toggleapplictionactive/:id', AdminuiAuth, applicationController.toggleStatus);
namedRouter.get('updatepassword', '/admin/updatepassword', AdminuiAuth, authController.updatepasswordGet)
namedRouter.post('updatepasswordcreate', '/admin/updatepasswordcreate', AdminuiAuth, authController.updatepasswordPost)
namedRouter.get('resetpasswordlink', '/admin/resetpasswordlink', authController.resetpasswordlinkGet)
namedRouter.post('resetpasswordlinkcreate', '/admin/resetpasswordlinkcreate', authController.resetpasswordlinkPost)
namedRouter.get('forgetpassword', '/admin/forgetpassword/:id/:token', authController.forgetPasswordGet)
namedRouter.post('forgetpasswordcreate', '/admin/forgetpasswordcreate/:id/:token', authController.forgetPasswordPost)

module.exports = router; 