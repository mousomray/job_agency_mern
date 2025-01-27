const JobApplicationModel = require('../model/jobapplication');

class JobRepo {

    // Add Job application 
    async createJobApplication(jobApplicationData) {
        return JobApplicationModel.create(jobApplicationData)
    }

    // Handle existing aapplication 
    async findJobApplicationByUserAndJob(userId, jobId) {
        return JobApplicationModel.find({ userId, jobId })
    }

    // Find all applications for a specific user along with job details
    async findApplicationsWithJobDetails(userId) {
        return await JobApplicationModel.find({ userId }).populate('jobId', '-_id -__v')
    }

    async getApplicationDetails() {
        return await JobApplicationModel.find()
            .populate('userId', 'name email image city') // Populates user details (name, email)
            .populate('jobId', 'title companyname image category'); // Populates job details (title companyname)

    }

    // Application status update function
    async findByApplicationId(applicationId) {
        return await JobApplicationModel.findById(applicationId);
    }
}

module.exports = new JobRepo();




