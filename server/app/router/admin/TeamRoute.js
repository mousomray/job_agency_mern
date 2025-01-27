const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const TeamController = require('../../module/team/controller/controller');
const { AdminuiAuth } = require('../../middleware/admin_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('addteam', '/admin/addteam', AdminuiAuth, TeamController.addTeam)
namedRouter.post('addteamCreate', '/admin/addteamcreate', AdminuiAuth, uploadImage.single('image'), TeamController.addteamPost)
namedRouter.get('team', '/admin/team', AdminuiAuth, TeamController.showteam)
namedRouter.get('singleteam', '/admin/singleteam/:id',AdminuiAuth, TeamController.singleteam)
namedRouter.post('editteam', '/admin/editteam/:id',AdminuiAuth, uploadImage.single('image'), TeamController.updateteam)
namedRouter.get('deleteteam', '/admin/deleteteam/:id',AdminuiAuth, TeamController.deleteteam)

module.exports = router; 