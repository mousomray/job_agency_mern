const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        required: "Name is required",
        minlength: [3, 'Name must be at least 3 characters']
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    position: {
        type: String,
        required: "Position is required",
        minlength: [3, 'Position must be at least 3 characters']
    },
    about: {
        type: String,
        required: "About is required",
        minlength: [10, 'About must be at least 10 characters']
    },
}, { timestamps: true });

const TeamModel = mongoose.model('team', TeamSchema);

module.exports = TeamModel;