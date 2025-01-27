const TestiRepo = require('../repository/TestiRepo')
const path = require('path');
const fs = require('fs');

class testimonialAdminController {

    // Add testimonial form
    async addTestimonial(req, res) {
        res.render('testimonial_view/addtesti', { user: req.user })
    }

    // Add data in testimonial 
    async addtestimonialPost(req, res) {
        try {
            const { title, message } = req.body;
            if (!title || !message || !req.file) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('addtestimonial'));
            }
            const testimonialData = {
                title: title.trim(),
                message: message.trim(),
                image: req.file.path
            };
            await TestiRepo.createTesti(testimonialData)
            req.flash('sucess', 'Testimonial added sucessfully')
            return res.redirect(generateUrl('testimonial'));
        } catch (error) {
            console.error('Error saving testimonial:', error);
            req.flash('err', 'Error posting testimonial')
            return res.redirect(generateUrl('addtestimonial'));
        }
    }

    // Get testimonial list 
    async showtestimonial(req, res) {
        try {
            const testimonials = await TestiRepo.allTesti()
            res.render('testimonial_view/testimonial', { testimonials, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving testimonials" });
        }
    }

    // Single testimonial 
    async singletestimonial(req, res) {
        const id = req.params.id;
        try {
            const testimonial = await TestiRepo.oneTesti(id)
            if (!testimonial) {
                return res.status(404).send('testimonial not found');
            }
            res.render('testimonial_view/edittestimonial', { testimonial, user: req.user });
        } catch (error) {
            console.error('Error fetching testimonial:', error);
            return res.status(500).send('Error fetching testimonial');
        }
    }

    // Handle PUT or PATCH for update blog
    async updatetestimonial(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        if (req.file) {
            const testimonial = await TestiRepo.oneTesti(id); // Find testimonial by id
            const imagePath = path.resolve(__dirname, '../../../../', testimonial.image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully:', testimonial.image);
                    }
                });
            } else {
                console.log('File does not exist:', imagePath);
            }
        }
        // Deleting image from uploads folder end
        try {
            const { title, message } = req.body;
            if (!title || !message) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('edittestimonial', { id }));
            }
            const existingtestimonial = await TestiRepo.oneTesti(id)
            if (!existingtestimonial) {
                return res.status(404).send('Testi not found.');
            }
            const testimonialData = {
                title: title.trim(),
                message: message.trim(),
                image: req.file ? req.file.path : existingtestimonial.image,
            };
            // Update the testi
            await TestiRepo.updateTesti(id, testimonialData)
            console.log(`Testi with ID ${id} updated`);
            req.flash('sucess', 'testimonial updated successfully');
            return res.redirect(generateUrl('testimonial'));
        } catch (error) {
            console.error('Error updating testimonial:', error);
            return res.status(500).send('Error updating testimonial');
        }
    }

    // Handle DELETE for delete testimonial
    async deletetestimonial(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        const testimonial = await TestiRepo.oneTesti(id)
        const imagePath = path.resolve(__dirname, '../../../../', testimonial.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully:', testimonial.image);
                }
            });
        } else {
            console.log('File does not exist:', imagePath);
        }
        // Deleting image from uploads folder end
        try {
            await TestiRepo.deleteTesti(id)
            req.flash('sucess', "testimonial deleted sucessfully")
            return res.redirect(generateUrl('testimonial')); // Redirect testimonial after deleting data
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            return res.status(500).send('Error deleting testimonial');
        }
    }
}

module.exports = new testimonialAdminController();