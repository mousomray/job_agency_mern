const JobAppRepo = require('../module/jobapplication/repository/jobAppRepo')

class jobAppController {

    // Create job application
    async addJobApplication(req, res) {
        try {
            // File Path Validation
            if (!req.file) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["Resume is required"]
                });
            }
            // Check if user has already applied for this job
            const existingApplication = await JobAppRepo.findJobApplicationByUserAndJob(req.body.userId, req.body.jobId)
            if (existingApplication.length > 0) {
                return res.status(400).json({
                    errors: ["You have allready applied this job"]
                });
            }
            const applicationData = {
                ...req.body, resume: req.file.path
            };
            const data = await JobAppRepo.createJobApplication(applicationData)
            res.status(201).json({
                success: true,
                message: "Job applied successfully",
                data
            })
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "An unexpected error occurred" }; // Other Field validation
            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // User's applied job list with job details
    async getUserJobApplications(req, res) {
        try {
            const userId = req.user._id;
            const applications = await JobAppRepo.findApplicationsWithJobDetails(userId);
            if (applications.length === 0) {
                return res.status(404).json({
                    message: "No job applications found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Job applications fetched successfully",
                data: applications,
                total: applications.length
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "An unexpected error occurred",
            });
        }
    }

}

module.exports = new jobAppController();