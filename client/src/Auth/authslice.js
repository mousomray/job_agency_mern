import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { myendpoints } from '../endpoint/endpoint';

const initialState = {
    loading: false,
    user: {}, // for user object
    Logouttoggle: false, // For Logout Button 
    userName: false,
}

// API fetch for Register
export const registerUser = createAsyncThunk("/signup", async (user) => {
    try {
        const apiurl = myendpoints[5]
        const response = await axiosInstance.post(apiurl, user);
        console.log("Fetching Reg data...", response);
        if (response && response?.status === 201) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.errors[0]);
        console.log(error);
    }
});

// API fetch for Login
export const loginRequest = createAsyncThunk("login", async (user) => {
    try {
        const apiurl = myendpoints[7]
        const response = await axiosInstance.post(apiurl, user);
        console.log("Fetching Login data...", response);

        if (response && response?.status === 200) {
            // toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        return response?.data;
    } catch (error) {
        console.log("Error fetching login data", error);
        toast.error(error?.response?.data?.message);
    }
});



export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        //check for auth token 
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("token");
            if (token !== null && token !== undefined) {
                state.Logouttoggle = true;
            }
        },

        logout: (state, { payload }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("userid");
            localStorage.removeItem("name");
            localStorage.removeItem("image");
            toast.success("Logout successfully")
            state.Logouttoggle = false
        },


        // For to go Register page after keeping token in local storage 
        RegLog: (state, { payload }) => {
            localStorage.removeItem("name");
            state.Logouttoggle = false

        },

    },

    extraReducers: (builder) => {

        // Register Request
        builder

            //For Registration Pending
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //For Registration Fulfilled
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
            })

            //For Registration Reject
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });


        // Login Request
        builder

            .addCase(loginRequest.pending, (state, action) => {
                state.loading = true;
            })

            .addCase(loginRequest.fulfilled, (state, { payload }) => {
                state.loading = false;
                console.log("My Login Payload...", payload);
                if (payload.success === true) {
                    localStorage.setItem("token", payload?.token);
                    localStorage.setItem("userid", payload?.data?._id);
                    localStorage.setItem("name", payload?.data?.name);
                    localStorage.setItem("image", payload?.data?.image);
                    state.Logouttoggle = true;
                    toast.success(`Hi ${payload?.data.name}, ${payload?.message}`);
                }
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
            });
    }

})

export const { check_token, logout, RegLog } = AuthSlice.actions

// Handle OTP verify which is make after registration 
export const verifyotp = async (data) => {
    try {
        const apiurl = myendpoints[6];
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching verifyotp data...", response)
        toast.success(response?.data?.message)
        return response
    } catch (error) {
        console.log("Error fetching verify data...", error);
        toast.error(error?.response?.data?.message);
    }
}

// Profile page handle
export const profilePage = async () => {
    try {
        const apiurl = myendpoints[9];
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching dashboard data...", response)
        return response?.data?.user
    } catch (error) {
        console.log("Error fetching dashboard data...", error);
    }
}

// Reset link for forget password 
export const resetpasswordlink = async (data) => {
    try {
        const apiurl = myendpoints[12];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching email verify data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching email verify data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Forget Password 
export const forgetpassword = async (data, id, token) => {
    try {
        const apiurl = `${myendpoints[13]}/${id}/${token}`;
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching forget data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching forget data", error);
        toast.error(error?.response?.data?.message);
    }
}

// Update Password 
export const updatepassword = async (data) => {
    try {
        const apiurl = myendpoints[14];
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching update data...", response);
        toast.success(response?.data?.message); 
        return response
    } catch (error) {
        console.log("Error fetching update data", error);
        toast.error(error?.response?.data?.message);
    }
}