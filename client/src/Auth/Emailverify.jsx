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
import { useMutation } from "@tanstack/react-query";
import { resetpasswordlink } from './authslice';
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



const Emailverify = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const reg = async (data) => {

    const mydata = {
      email: data.email,
    }

    const response = await resetpasswordlink(mydata)
    console.log("My Email verify response is ", response);
    if (response && response?.data?.status === true) {
      const id = response?.data?.user?._id; // id comes from API response
      const token = response?.data?.token; // token comes from API response
      reset(); // Blank form after submitting data
      navigate(`/forgetpassword/${id}/${token}`);
      setLoading(false);
    } else {
      setLoading(false);
    }

    return response.data;
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
                Verify Email
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

                </Grid>


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? 'Please wait...' : 'Verify'}
                </Button>

              </Box>
            </Box>
          </Container>
        </ThemeProvider>

      </Wrapper>
    </>
  )
}

export default Emailverify