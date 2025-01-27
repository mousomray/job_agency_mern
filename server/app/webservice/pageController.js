const TestimonialRepo = require('../module/testimonial/repository/TestiRepo')
const TeamRepo = require('../module/team/repository/TeamRepo')

class pageController {

    // Testimonial List
    async showtestimonial(req, res) {
        try {
            const testimonials = await TestimonialRepo.allTesti()
            res.status(200).json({ succes: true, message: "Testimonial data retrive sucessfully", testimonials, total: testimonials.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving testimonials" });
        }
    }

    // Team List
    async showteam(req, res) {
        try {
            const teams = await TeamRepo.allTeam();
            res.status(200).json({ succes: true, message: "Team data retrive sucessfully", teams, total: teams.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving teams" });
        }
    }

}

module.exports = new pageController();