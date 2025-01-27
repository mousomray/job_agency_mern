import { toast } from "react-toastify";
import axiosInstance from "../api/api";
import { myendpoints } from "../endpoint/endpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Job list function
export const jobList = createAsyncThunk("joblist", async ({ page, perpage }, { rejectWithValue }) => {
    try {
        const apiurl = `${myendpoints[0]}?page=${page}&perpage=${perpage}`;
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Job list data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Job list data", error);
        return rejectWithValue(error.response.data);
    }
});
// createSlice for job list area start
const jobslicers = createSlice({
    name: "jobslicers",
    initialState: {
        jobdata: [],
        totalpage: "", // Make For Pagination 
        totaldata: "", // Make For Pagination 
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

            .addCase(jobList.pending, (state) => {
                state.loading = true;
            })

            .addCase(jobList.fulfilled, (state, action) => {
                state.loading = false;
                state.jobdata = action.payload.jobs;
                state.totalpage = action.payload.pagination.totalPage; // For Pagination
                state.totaldata = action.payload.pagination.totalData; // For Pagination
            })

            .addCase(jobList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default jobslicers.reducer;

export const jobDetails = async (id) => {
    try {
        const apiurl = `${myendpoints[0]}/${id}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching single job...", response)
        return response?.data?.job
    } catch (error) {
        console.log("Error fetching job details...", error);
    }
}


// Category list function 
export const allCategories = async () => {
    try {
        const apiurl = myendpoints[1]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching categories data...", response)
        return response?.data
    } catch (error) {
        console.log("Error fetching categories...", error);
    }
}

// Status list function 
export const allStatus = async () => {
    try {
        const apiurl = myendpoints[2]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching employment status data...", response)
        return response?.data
    } catch (error) {
        console.log("Error fetching employment status...", error);
    }
}

// Experience list function 
export const allExperience = async () => {
    try {
        const apiurl = myendpoints[3]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching experience  data...", response)
        return response?.data
    } catch (error) {
        console.log("Error fetching experience...", error);
    }
}

// Location list function 
export const allLocation = async () => {
    try {
        const apiurl = myendpoints[4]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching location  data...", response)
        return response?.data
    } catch (error) {
        console.log("Error fetching location...", error);
    }
}

// Category wise job 
export const singleCategory = async (slug) => {
    try {
        const apiurl = `${myendpoints[1]}/${slug}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching categories data...", response)
        return response?.data?.jobs
    } catch (error) {
        console.log("Error fetching categories...", error);
    }
}

// Category wise job 
export const singleStatus = async (slug) => {
    try {
        const apiurl = `${myendpoints[2]}/${slug}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching status data...", response)
        return response?.data?.jobs
    } catch (error) {
        console.log("Error fetching status...", error);
    }
}

// Experience wise job 
export const singleExperience = async (slug) => {
    try {
        const apiurl = `${myendpoints[3]}/${slug}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching experience data...", response)
        return response?.data?.jobs
    } catch (error) {
        console.log("Error fetching experience...", error);
    }
}

// Location wise job 
export const singleLocation = async (slug) => {
    try {
        const apiurl = `${myendpoints[4]}/${slug}`
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching location data...", response)
        return response?.data?.jobs
    } catch (error) {
        console.log("Error fetching location...", error);
    }
}

// Apply job 
export const applyJob = async (data) => {
    try {
        const apiurl = myendpoints[8]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching job apply data...", response)
        toast.success(response?.data?.message)
        return response
    } catch (error) {
        console.log("Error fetching apply job data...", error);
        toast.error(error?.response?.data?.errors[0])
    }
}

// Apply job  list
export const applyList = async () => {
    try {
        const apiurl = myendpoints[10]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching job apply list data...", response)
        return response?.data?.data
    } catch (error) {
        console.log("Error fetching apply job data...", error);
    }
}

// Testimonial  list
export const testimonialList = async () => {
    try {
        const apiurl = myendpoints[11]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching testimonial list data...", response)
        return response?.data?.testimonials
    } catch (error) {
        console.log("Error fetching testimonial data...", error);
    }
} 

// Team  list
export const teamList = async () => {
    try {
        const apiurl = myendpoints[15]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching team list data...", response)
        return response?.data?.teams
    } catch (error) {
        console.log("Error fetching team data...", error);
    }
} 