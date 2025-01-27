const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const TestiController = require('../../module/testimonial/controller/controller');
const { AdminuiAuth } = require('../../middleware/admin_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('addtestimonial', '/admin/addtestimonial', AdminuiAuth, TestiController.addTestimonial)
namedRouter.post('addtestimonialCreate', '/admin/addtestimonialcreate', AdminuiAuth, uploadImage.single('image'), TestiController.addtestimonialPost)
namedRouter.get('testimonial', '/admin/testimonial', AdminuiAuth, TestiController.showtestimonial)
namedRouter.get('singletestimonial', '/admin/singletestimonial/:id',AdminuiAuth, TestiController.singletestimonial)
namedRouter.post('edittestimonial', '/admin/edittestimonial/:id',AdminuiAuth, uploadImage.single('image'), TestiController.updatetestimonial)
namedRouter.get('deletetestimonial', '/admin/deletetestimonial/:id',AdminuiAuth, TestiController.deletetestimonial)

module.exports = router; 