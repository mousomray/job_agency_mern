const TeamRepo = require('../repository/TeamRepo')
const path = require('path');
const fs = require('fs');

class teamAdminController {

    // Add team form
    async addTeam(req, res) {
        res.render('team_view/addteam', { user: req.user })
    }

    // Add data in team 
    async addteamPost(req, res) {
        try {
            const { name, position, about } = req.body;
            if (!name || !position || !about || !req.file) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('addteam'));
            }
            const teamData = {
                name: name.trim(),
                position: position.trim(),
                about: about.trim(),
                image: req.file.path
            };
            await TeamRepo.createTeam(teamData)
            req.flash('sucess', 'Team added sucessfully')
            return res.redirect(generateUrl('team'));
        } catch (error) {
            console.error('Error saving team:', error);
            req.flash('err', 'Error posting team')
            return res.redirect(generateUrl('addteam'));
        }
    }

    // Get team list 
    async showteam(req, res) {
        try {
            const teams = await TeamRepo.allTeam()
            res.render('team_view/team', { teams, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving teams" });
        }
    }

    // Single team 
    async singleteam(req, res) {
        const id = req.params.id;
        try {
            const team = await TeamRepo.oneTeam(id)
            if (!team) {
                return res.status(404).send('team not found');
            }
            res.render('team_view/editteam', { team, user: req.user });
        } catch (error) {
            console.error('Error fetching team:', error);
            return res.status(500).send('Error fetching team');
        }
    }

    // Handle PUT or PATCH for update blog
    async updateteam(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        if (req.file) {
            const team = await TeamRepo.oneTeam(id) // Find team by id
            const imagePath = path.resolve(__dirname, '../../../../', team.image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully:', team.image);
                    }
                });
            } else {
                console.log('File does not exist:', imagePath);
            }
        }
        // Deleting image from uploads folder end
        try {
            const { name, position, about } = req.body;
            if (!name || !position || !about) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('editteam', { id }));
            }
            const existingteam = await TeamRepo.oneTeam(id)
            if (!existingteam) {
                return res.status(404).send('Team not found.');
            }
            const teamData = {
                name: name.trim(),
                position: position.trim(),
                about: about.trim(),
                image: req.file ? req.file.path : existingteam.image,
            };
            // Update the testi
            await TeamRepo.updateTeam(id, teamData)
            console.log(`Testi with ID ${id} updated`);
            req.flash('sucess', 'Team updated successfully');
            return res.redirect(generateUrl('team'));
        } catch (error) {
            console.error('Error updating team:', error);
            return res.status(500).send('Error updating team');
        }
    }

    // Handle DELETE for delete team
    async deleteteam(req, res) {
        const id = req.params.id;
        // Deleting image from uploads folder start
        const team = await TeamRepo.oneTeam(id)
        const imagePath = path.resolve(__dirname, '../../../../', team.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image file deleted successfully:', team.image);
                }
            });
        } else {
            console.log('File does not exist:', imagePath);
        }
        // Deleting image from uploads folder end
        try {
            await TeamRepo.deleteTeam(id)
            req.flash('sucess', "Team deleted sucessfully")
            return res.redirect(generateUrl('team')); // Redirect team after deleting data
        } catch (error) {
            console.error('Error deleting team:', error);
            return res.status(500).send('Error deleting team');
        }
    }
}

module.exports = new teamAdminController();