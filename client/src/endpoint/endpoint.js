export const endpoints = {

    auth: {
        register: "auth/signup",
        login: "auth/signin",
        dashboard: "auth/dashboard",
        forget: "auth/forgotpassword",
        updatepassword: "auth/updatepassword",
        verify: "auth/verifyotp",
        resetpassword: "auth/resetpassword"

    },

    cms: {
        joblist: "api/joblist",
        categorylist: "api/categorylist",
        statuslist: "api/employmentstatuslist",
        experiencelist: "api/experiencelist",
        locationlist: "api/locationlist",
        apply: "api/createjobapplication",
        applicationlist: "api/jobapplication",
        testimonial: "api/testimoniallist",
        team: "api/teamlist",
    },

}

export const myendpoints = [
    endpoints.cms.joblist, //Index number 0 
    endpoints.cms.categorylist, //Index number 1 
    endpoints.cms.statuslist, //Index number 2 
    endpoints.cms.experiencelist, //Index number 3 
    endpoints.cms.locationlist, //Index number 4 
    endpoints.auth.register, // 5
    endpoints.auth.verify, // 6
    endpoints.auth.login, // 7
    endpoints.cms.apply, // 8
    endpoints.auth.dashboard, // 9
    endpoints.cms.applicationlist, // 10
    endpoints.cms.testimonial, // 11
    endpoints.auth.resetpassword, // 12
    endpoints.auth.forget, // 13
    endpoints.auth.updatepassword, // 14
    endpoints.cms.team, // 15
]