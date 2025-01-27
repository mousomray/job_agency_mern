const express = require('express');
const routeLabel = require('route-label');
const pageController = require('../../webservice/pageController');
const { UserAuth } = require('../../middleware/user_auth/auth');
const uploadImage = require('../../helper/imagehandler') // Image area

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('testimoniallist', '/testimoniallist', pageController.showtestimonial)
namedRouter.get('teamlist', '/teamlist', pageController.showteam)

module.exports = router;  