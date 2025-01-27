import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../Common/Wrapper';
import { Link } from 'react-router-dom';
import { forgetpassword } from './authslice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PasswordIcon from '@mui/icons-material/Password';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form'; // Import useForm hook 
import { useMutation } from '@tanstack/react-query';



const Forgetpassword = () => {

    const { id, token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State


    // Function For Mutation
    const myforget = async (data) => {

        const myforgetdata = {
            password: data.password,
            confirmPassword: data.confirmPassword
        }

        const response = await forgetpassword(myforgetdata, id, token)
        console.log("My Forget response is ", response);
        if (response && response?.data?.status === "success") {
            reset();
            navigate('/signin');
            setLoading(false)
        } else {
            setLoading(false)
        }
    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => myforget(data),
    });


    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
        setLoading(true)
    };

    return (
        <Wrapper>
            <Container component="main" maxWidth="xs" style={{ marginTop: '150px' }}>
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
                        <PasswordIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forget Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>


                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="Password"
                                    {...register("password", {
                                        required: "This field is Required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be 8 characters"
                                        }
                                    })}
                                />
                                {errors?.password && (
                                    <p style={{ color: 'red' }}>{errors.password.message}</p>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    {...register("confirmPassword")}
                                />
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress color="inherit" /> : "Change"}

                        </Button>
                    </Box>
                </Box>
            </Container>
        </Wrapper>
    );
};

export default Forgetpassword;