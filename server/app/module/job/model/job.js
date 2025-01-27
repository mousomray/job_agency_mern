const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: 'Job title is required'
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    companyname: {
        type: String,
        required: "Company name is required"
    },
    category: {
        type: String,
        required: "Category is required"
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: [true, 'Job responsibilities are required'],
    },
    educationAndExperience: {
        type: String,
        required: [true, 'Education and experience details are required'],
    },
    jobSummary: {
        vacancy: {
            type: Number,
            required: [true, 'Vacancy is required'],
            min: [1, 'Vacancy must be at least 1'],
        },
        employmentStatus: {
            type: String,
            enum: ['Fulltime', 'Parttime', 'Contractual', 'Internship'],
            required: [true, 'Employment status is required'],
        },
        experience: {
            type: String,
            required: [true, 'Experience details are required'],
        },
        location: {
            type: String,
            required: [true, 'Job location is required'],
        },
        salary: {
            type: Number,
            required: [true, 'Salary information is required'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Others', 'Any'],
            required: "Please enter your gender"
        },
        applicationDeadline: {
            type: Date,
            required: "Date is required"
        },
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: "User Id is Required"
    },
}, { timestamps: true });

const JobModel = mongoose.model('job', JobSchema);

module.exports = JobModel;