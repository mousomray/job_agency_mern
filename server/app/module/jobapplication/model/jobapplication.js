const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: "UserID is required"
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job',
            required: "JobID is required"
        },
        resume: {
            type: String,
            required: "Post your resume"
        },
        coverLetter: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'approved'],
            default: 'pending',
        }
    },
    { timestamps: true }
);

const JobApplicationModel = mongoose.model('jobapplication', JobApplicationSchema);

module.exports = JobApplicationModel;
