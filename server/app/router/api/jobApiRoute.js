const express = require('express');
const routeLabel = require('route-label');
const jobApiController = require('../../webservice/jobApiController');
const { UserAuth } = require('../../middleware/user_auth/auth');
const uploadImage = require('../../helper/imagehandler') // Image area

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('joblist', '/joblist', jobApiController.showjobs)
namedRouter.get('jobdetails', '/joblist/:id', UserAuth, jobApiController.jobDetails)
namedRouter.get('categorylist', '/categorylist', jobApiController.showCategories)
namedRouter.get('categorydetails', '/categorylist/:category', UserAuth, jobApiController.categorydetails);
namedRouter.get('employmentstatuslist', '/employmentstatuslist', jobApiController.showEmpStatus)
namedRouter.get('statusdetails', '/employmentstatuslist/:status', UserAuth, jobApiController.statusdetails);
namedRouter.get('experiencelist', '/experiencelist', jobApiController.showExperiences)
namedRouter.get('experiencedetails', '/experiencelist/:experience', UserAuth, jobApiController.experiencedetails);
namedRouter.get('locationlist', '/locationlist', jobApiController.showLocations)
namedRouter.get('locationdetails', '/locationlist/:location', UserAuth, jobApiController.locationdetails);

module.exports = router;  