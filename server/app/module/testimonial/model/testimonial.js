const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: [3, 'Title must be at least 3 characters']
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    message: {
        type: String,
        required: "Testimonial is required",
        minlength: [10, 'Testimonial must be at least 10 characters']
    },
}, { timestamps: true });

const TestimonialModel = mongoose.model('testimonial', TestimonialSchema);

module.exports = TestimonialModel;