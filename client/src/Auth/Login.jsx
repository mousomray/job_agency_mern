import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Wrapper from '../Common/Wrapper'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "@tanstack/react-query";
import { loginRequest, RegLog } from './authslice';
import { useNavigate } from 'react-router-dom';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();



const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { loading } = useSelector((state) => state?.Auth);
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const reg = async (data) => {

        const mylogindata = {
            email: data.email,
            password: data.password
        }

        try {
            const response = await dispatch(loginRequest(mylogindata))
            console.log("My Login response is ", response);
            if (response && response?.payload?.success === true) {
                reset(); // Blank form after submitting data
                navigate("/jobs");
                setLoading(false)
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log("Error...", error)
            setLoading(false);
        }

    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => reg(data),
    });


    // Handle On Submit Area
    const onSubmit = (data) => {
        setLoading(true);
        mutation.mutate(data);
    };



    // If I not use this function then I can't go register page when token will be present in local storage

    const log = () => {
        dispatch(RegLog())
    }


    return (
        <>
            <Wrapper>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 15,
                                marginBottom: 8,
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Signin
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>

                                <Grid container spacing={2}>



                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            label="Email"
                                            {...register("email")}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            id="password"
                                            label="Password"
                                            {...register("password")}
                                        />
                                    </Grid>

                                </Grid>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? 'Please wait...' : 'Signin'}
                                </Button>

                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item>
                                        <Link to="/signup" variant="body2" onClick={log}>
                                            {"Don't have an account? Register Now"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item>
                                        <Link to="/emailverify" variant="body2">
                                            {"Forget Password"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            </Wrapper>
        </>
    )
}

export default Login