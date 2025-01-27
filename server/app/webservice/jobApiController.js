const JobRepo = require('../module/job/repository/JobRepo')

class jobApiController {

    // Job list with pagination
    async showjobs(req, res) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 6
            const totalData = await JobRepo.countJob()
            const totalPage = Math.ceil(totalData / limit)
            const nextPage = totalPage > page ? page + 1 : null
            const prevPage = page > 1 ? page - 1 : null

            const jobs = await JobRepo.getActiveJobs(page, limit)
            res.status(200).json({
                message: "Job retrieved successfully",
                jobs,
                pagination: {
                    page,
                    prevPage,
                    nextPage,
                    totalPage,
                    totalData,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving jobs" });
        }
    }

    // Get Single 
    async jobDetails(req, res) {
        const id = req.params.id;
        try {
            const job = await JobRepo.oneJob(id);
            res.status(200).json({ message: "Single job fetched", job })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving single job" });
        }
    }

    // Category List API
    async showCategories(req, res) {
        try {
            const categories = await JobRepo.fetchCategory()
            const categoryData = categories.map((category) => ({
                slug: category.toLowerCase().replace(/\s+/g, '-'),
                name: category,
                url: `/api/categorylist/${category.toLowerCase().replace(/\s+/g, '-')}`
            }));
            res.json(categoryData);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Error fetching categories" });
        }
    }

    // Single Category
    async categorydetails(req, res) {
        const category = req.params.category;
        try {
            const regex = new RegExp(`^${category.replace(/-/g, ' ')}`, 'i');
            const jobs = await JobRepo.categoryDetails(regex)
            res.json({
                success: true,
                message: `Found ${jobs.length} jobs for category "${category}"`,
                totalJobs: jobs.length,
                jobs,
            });
        } catch (error) {
            console.error("Error fetching jobs by category:", error);
            res.status(500).json({ success: false, message: "Error retrieving jobs" });
        }
    }

    // Brand Status API
    async showEmpStatus(req, res) {
        try {
            const empstatus = await JobRepo.fetchEmploymentStatus()
            const empstatusData = empstatus.map((status) => ({
                slug: status.toLowerCase().replace(/\s+/g, '-'),
                name: status,
                url: `/api/employmentstatuslist/${status.toLowerCase().replace(/\s+/g, '-')}`
            }));
            res.json(empstatusData);
        } catch (error) {
            console.error("Error fetching emp status:", error);
            res.status(500).json({ message: "Error fetching emp status" });
        }
    }

    // Single Status
    async statusdetails(req, res) {
        const status = req.params.status;
        try {
            const regex = new RegExp(`^${status.replace(/-/g, ' ')}`, 'i');
            const jobs = await JobRepo.employmentStatusDetails(regex)
            res.json({
                success: true,
                message: `Found ${jobs.length} jobs for status "${status}"`,
                totalJobs: jobs.length,
                jobs,
            });
        } catch (error) {
            console.error("Error fetching jobs by employment status:", error);
            res.status(500).json({ success: false, message: "Error retrieving employment status" });
        }
    }

    // Experience List API
    async showExperiences(req, res) {
        try {
            const experiences = await JobRepo.fetchExperience()
            const experienceData = experiences.map((experience) => ({
                slug: experience.toLowerCase().replace(/\s+/g, '-'),
                name: experience,
                url: `/api/experiencelist/${experience.toLowerCase().replace(/\s+/g, '-')}`
            }));
            res.json(experienceData);
        } catch (error) {
            console.error("Error fetching experiences:", error);
            res.status(500).json({ message: "Error fetching experiences" });
        }
    }

    // Single Experience
    async experiencedetails(req, res) {
        const experience = req.params.experience;
        try {
            const regex = new RegExp(`^${experience.replace(/-/g, ' ')}`, 'i');
            const jobs = await JobRepo.experienceDetails(regex)
            res.json({
                success: true,
                message: `Found ${jobs.length} jobs for status "${experience}"`,
                totalJobs: jobs.length,
                jobs,
            });
        } catch (error) {
            console.error("Error fetching jobs by employment status:", error);
            res.status(500).json({ success: false, message: "Error retrieving employment status" });
        }
    }

    // Location List API
    async showLocations(req, res) {
        try {
            const locations = await JobRepo.fetchLocation();
            const locationData = locations.map((location) => ({
                slug: location.toLowerCase().replace(/\s+/g, '-'),
                name: location,
                url: `/api/locationlist/${location.toLowerCase().replace(/\s+/g, '-')}`
            }));
            res.json(locationData);
        } catch (error) {
            console.error("Error fetching locations:", error);
            res.status(500).json({ message: "Error fetching locations" });
        }
    }

    // Single location
    async locationdetails(req, res) {
        const location = req.params.location;
        try {
            const regex = new RegExp(`^${location.replace(/-/g, ' ')}`, 'i');
            const jobs = await JobRepo.locationDetails(regex)
            res.json({
                success: true,
                message: `Found ${jobs.length} jobs for status "${location}"`,
                totalJobs: jobs.length,
                jobs,
            });
        } catch (error) {
            console.error("Error fetching jobs by location:", error);
            res.status(500).json({ success: false, message: "Error retrieving location" });
        }
    }

    // Search with query parameter
    async search(req, res) {
        const { title, category } = req.query;
        const filter = {};
        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }
        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }
        try {
            const products = await ProductRepo.getSearchProduct(filter);
            res.status(200).json({
                message: 'Search products retrieved successfully',
                total: products.length,
                products
            });
        } catch (error) {
            console.error('Error retrieving search products:', error);
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

}

module.exports = new jobApiController();