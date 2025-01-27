const express = require('express');
const routeLabel = require('route-label');
const jobAppController = require('../../webservice/JobAppController');
const { UserAuth } = require('../../middleware/user_auth/auth');
const uploadFile = require('../../helper/fileHandler') // Image area

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.post('createjobapplication', '/createjobapplication', uploadFile.single('resume'), UserAuth, jobAppController.addJobApplication)
namedRouter.get('jobapplication', '/jobapplication', UserAuth, jobAppController.getUserJobApplications)

module.exports = router;  