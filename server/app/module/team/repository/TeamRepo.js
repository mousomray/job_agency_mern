const TeamModel = require('../model/team');

class TeamRepo {

    // Add team function
    async createTeam(teamData) {
        return TeamModel.create(teamData)
    }

    // All team function for admin pannel
    async allTeam() {
        return await TeamModel.find();
    }

    // Fetch single team
    async oneTeam(id) {
        return await TeamModel.findById(id);
    }

    // Update team 
    async updateTeam(id, teamData) {
        return await TeamModel.findByIdAndUpdate(id, teamData)
    }

    // Delete team 
    async deleteTeam(id) {
        return await TeamModel.findByIdAndDelete(id);
    }

}

module.exports = new TeamRepo(); 