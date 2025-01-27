const JobModel = require('../model/job');

class JobRepo {

    // Add Job function
    async createJob(jobData) {
        return JobModel.create(jobData)
    }

    // All job function for employer pannel
    async allJobs(userId) {
        return await JobModel.find({ userId });
    }

    // Fetch Job for api where I add pagination
    async getActiveJobs(page, limit) {
        const skip = (page - 1) * limit;
        return await JobModel.find({ status: "active" }).skip(skip).limit(limit);
    }

    // Get search product with query parameter
    // async getSearchProduct(filter) {
    //     return await ProductModel.find({ active: true, ...filter })
    // }



    // Total Job 
    async countJob() {
        return await JobModel.countDocuments({ status: "active" });
    }

    // Fetch single product
    async oneJob(id) {
        return await JobModel.findById(id);
    }

    // Update job 
    async updatejob(id, jobData) {
        return await JobModel.findByIdAndUpdate(id, jobData, { new: true })
    }

    // Delete product 
    async deletejob(id) {
        return await JobModel.findByIdAndDelete(id);
    }

    // Fetch category list
    async fetchCategory() {
        return await JobModel.distinct("category");
    }

    // Find by category 
    async categoryDetails(categoryRegex) {
        return await JobModel.find({ status: "active", category: categoryRegex });
    }

    // Fetch employment status
    async fetchEmploymentStatus() {
        return await JobModel.distinct("jobSummary.employmentStatus");
    }

    // Find by employment status 
    async employmentStatusDetails(employmentRegex) {
        return await JobModel.find({ status: "active", "jobSummary.employmentStatus": employmentRegex });
    }

    // Fetch experience list
    async fetchExperience() {
        return await JobModel.distinct("jobSummary.experience");
    }

    // Find by experience 
    async experienceDetails(experienceRegex) {
        return await JobModel.find({ status: "active", "jobSummary.experience": experienceRegex });
    }

     // Fetch location list
     async fetchLocation() {
        return await JobModel.distinct("jobSummary.location");
    }

    // Find by location 
    async locationDetails(locationRegex) {
        return await JobModel.find({ status: "active", "jobSummary.location": locationRegex });
    }
}

module.exports = new JobRepo();




