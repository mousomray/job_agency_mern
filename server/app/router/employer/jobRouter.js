const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const jobController = require('../../module/job/controller/JobController');
const { EmployeruiAuth } = require('../../middleware/employer_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('addjobGet', '/employer/addjob', EmployeruiAuth, jobController.addJobGet)
namedRouter.post('addjobPost', '/employer/addjobcreate', EmployeruiAuth, uploadImage.single('image'), jobController.addJobPost)
namedRouter.get('alljobs', '/employer/jobs', EmployeruiAuth, jobController.showjobs)
namedRouter.get('singlejob', '/employer/job/:id', EmployeruiAuth, jobController.singleJob)
namedRouter.get('togglejobactive', '/employer/togglejobactive/:id', EmployeruiAuth, jobController.toggleJobActive);
namedRouter.post('updatejob', '/employer/updatejob/:id', EmployeruiAuth, uploadImage.single('image'), jobController.updatejob);
namedRouter.get('deletejob', '/employer/deletejob/:id', EmployeruiAuth, jobController.deletejob)

module.exports = router; 