const JobRepo = require('../repository/JobRepo')
const path = require('path');
const fs = require('fs');

class JobEmployerController {

    // Add product form
    async addJobGet(req, res) {
        res.render('job_view/addjob', { user: req.user })
    }

    // Add data in product 
    async addJobPost(req, res) {
        try {
            const {
                title,
                companyname,
                category,
                description,
                responsibilities,
                educationAndExperience,
                vacancy,
                employmentStatus,
                experience,
                location,
                salary,
                gender,
                applicationDeadline,
            } = req.body;

            // Validate all required fields
            if (
                !title ||
                !companyname ||
                !category ||
                !description ||
                !responsibilities ||
                !educationAndExperience ||
                !vacancy ||
                !employmentStatus ||
                !experience ||
                !location ||
                !salary ||
                !gender ||
                !applicationDeadline ||
                !req.file
            ) {
                return res.send("All fields are required");
            }
            const jobData = {
                title: title,
                companyname: companyname,
                category: category,
                description: description,
                responsibilities: responsibilities,
                educationAndExperience: educationAndExperience,
                image: req.file.path, // Save image path
                jobSummary: {
                    vacancy: vacancy, // Ensure numeric value
                    employmentStatus: employmentStatus,
                    experience: experience,
                    location: location,
                    salary: salary, // Ensure numeric value
                    gender: gender,
                    applicationDeadline: applicationDeadline, // Convert to Date object
                },
                userId: req.user._id, // Assuming `user` is added to the request via middleware
            };
            await JobRepo.createJob(jobData);
            req.flash('sucess', 'Job added successfully');
            return res.redirect(generateUrl('alljobs'));
        } catch (error) {
            console.error('Error saving job:', error);
            req.flash('err', 'Error posting job');
            return res.redirect(generateUrl('addjobGet'));
        }
    }

    // Get job list 
    async showjobs(req, res) {
        try {
            const userId = req.user._id
            const jobs = await JobRepo.allJobs(userId)
            res.render('job_view/job', { jobs, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving jobs" });
        }
    }

    // Get Single 
    async singleJob(req, res) {
        const id = req.params.id;
        try {
            const job = await JobRepo.oneJob(id);
            if (!job) {
                return res.status(404).send('Job not found');
            }
            res.render('job_view/editjob', { job, user: req.user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving job data" });
        }
    }

    // Handle Toggle Active Job
    async toggleJobActive(req, res) {
        try {
            const jobId = req.params.id;
            const job = await JobRepo.oneJob(jobId)
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }
            // Toggle status between 'active' and 'inactive'
            job.status = job.status === "active" ? "inactive" : "active";
            await job.save();
            req.flash('sucess', "Active status change sucessfully")
            res.redirect(generateUrl('alljobs'));
        } catch (error) {
            console.error(error);
            req.flash('err', "Active status not change")
            res.status(500).json({ message: "Error updating employer status" });
        }
    }

    // Update job
    async updatejob(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        if (req.file) {
            const job = await JobRepo.oneJob(id)
            const imagePath = path.resolve(__dirname, '../../../../', job.image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully:', job.image);
                    }
                });
            } else {
                console.log('File does not exist:', imagePath);
            }
        }
        // Deleting image from uploads folder end
        try {
            const {
                title,
                companyname,
                category,
                description,
                responsibilities,
                educationAndExperience,
                vacancy,
                employmentStatus,
                experience,
                location,
                salary,
                gender,
                applicationDeadline,
            } = req.body;

            // Validate all required fields
            if (
                !title ||
                !companyname ||
                !category ||
                !description ||
                !responsibilities ||
                !educationAndExperience ||
                !vacancy ||
                !employmentStatus ||
                !experience ||
                !location ||
                !salary ||
                !gender ||
                !applicationDeadline
            ) {
                return res.send("All fields are required");
            }
            const existingJob = await JobRepo.oneJob(id)
            if (!existingJob) {
                return res.status(404).send('Job not found.');
            }
            const jobData = {
                title: title,
                companyname: companyname,
                category: category,
                description: description,
                responsibilities: responsibilities,
                educationAndExperience: educationAndExperience,
                image: req.file ? req.file.path : existingJob.image,
                jobSummary: {
                    vacancy: vacancy, // Ensure numeric value
                    employmentStatus: employmentStatus,
                    experience: experience,
                    location: location,
                    salary: salary, // Ensure numeric value
                    gender: gender,
                    applicationDeadline: applicationDeadline, 
                },
                userId: req.user._id, // Assuming `user` is added to the request via middleware
            }
            // Update the blog
            await JobRepo.updatejob(id, jobData)
            console.log(`Blog with ID ${id} updated`);
            req.flash('sucess', 'Job updated successfully');
            return res.redirect(generateUrl('alljobs'));
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).send('Error updating product');
        }
    }

    // Delete job 
    async deletejob(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        const job = await JobRepo.oneJob(id)
        const imagePath = path.resolve(__dirname, '../../../../', job.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully:', job.image);
                }
            });
        } else {
            console.log('File does not exist:', imagePath);
        }
        // Deleting image from uploads folder end
        try {
            await JobRepo.deletejob(id)
            req.flash('sucess', "Job deleted sucessfully")
            return res.redirect(generateUrl('alljobs')); // Redirect product after deleting data
        } catch (error) {
            console.error('Error deleting job:', error);
            return res.status(500).send('Error deleting job');
        }
    }



}

module.exports = new JobEmployerController();