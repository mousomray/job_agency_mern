const TestimonialModel = require('../model/testimonial');

class TestiRepo {

    // Add testi function
    async createTesti(testiData) {
        return TestimonialModel.create(testiData)
    }

    // All testimonial function for admin pannel
    async allTesti() {
        return await TestimonialModel.find();
    }

    // Fetch single testimonial
    async oneTesti(id) {
        return await TestimonialModel.findById(id);
    }

    // Update testimonial 
    async updateTesti(id, testiData) {
        return await TestimonialModel.findByIdAndUpdate(id, testiData)
    }

    // Delete testimonial 
    async deleteTesti(id) {
        return await TestimonialModel.findByIdAndDelete(id);
    }

}

module.exports = new TestiRepo(); 