const JobAppRepo = require('../repository/jobAppRepo')

class jobAppController {

    // Job application list 
    async getApplicationList(req, res) {
        try {
            const application = await JobAppRepo.getApplicationDetails()
            res.render('admin_view/applicationlist', { application, user: req.user });
        } catch (error) {
            res.status(500).json({ message: "Error retrieving application" });
        }
    }

    // Handle active inactive
    async toggleStatus(req, res) {
        try {
            const applicationId = req.params.id;
            const application = await JobAppRepo.findByApplicationId(applicationId)
            if (!application) {
                return res.status(404).json({ message: "Application not found" });
            }
            // Toggle status between 'active' and 'inactive'
            application.status = application.status === "pending" ? "approved" : "pending";
            await application.save();
            req.flash('sucess', "Status change sucessfully")
            res.redirect(generateUrl('applicationList'));
        } catch (error) {
            console.error(error);
            req.flash('err', "Status not change")
            res.status(500).json({ message: "Error updating status" });
        }
    }


}

module.exports = new jobAppController()