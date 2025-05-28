import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { useAlert } from './AlertContext.jsx'; 
import { supabase } from '../supabase';

export default function LoginPage() {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const [loginFormData, setLoginFormData] = useState({
    email: { value: '', error: false, helperText: ''},
    password: { value: '', error: false, helperText: '' },
  });
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setLoginFormData(prevLoginFormData => {
      prevLoginFormData[event.target.name].value = event.target.value;
      return prevLoginFormData;
    });
  }

  const handleClickLoginBtn = async (event) => {
    event.preventDefault();

    let errorFound = false;
    for (const inputName of Object.keys(loginFormData)) {
      errorFound = !validateFormInput(inputName);
    }
    if (errorFound) {
      return;
    }
    
    await loginUser();
  }

  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginFormData.email.value,
      password: loginFormData.password.value,
    });

    if (error) {
      if (error.code === "invalid_credentials") {
        showErrorAlert(`Incorrect username or password, please try again`);
        return;
      }
      showErrorAlert(`${error.code}: ${error.messsage}`);
      return;
    }
    console.log(data);
    showSuccessAlert('Successfully logged in');
    // probably fetch the users role here from the profiles table and conditionally navigate them to either the normal dashboard or the admin dashboard
    navigate('/dashboard');
  }

  const validateFormInput = (inputName) => {
    if (loginFormData[inputName].value.trim() === '') {
      setLoginFormData(prevData => {
        return {
          ...prevData,
          [inputName]: { 
            value: '',
            error: true,
            helperText: `${inputName} must not be empty`
           }
        }
      })
      return false;
    }
    return true;
  }

    

  return (
    <>
      <PageContainer>
        <Typography variant="h3">Question Asking App</Typography>
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 7}}>
          <Typography variant="h4">
              Login
          </Typography>
          <TextField 
            name="email" 
            label="Email" 
            sx={{mt: 2}} 
            error={loginFormData['email'].error}
            helperText={loginFormData['email'].helperText}
            onChange={handleFormChange}>
          </TextField>
          <TextField 
            name="password" 
            label="Password" 
            sx={{mt: 2}}
            error={loginFormData['password'].error}
            helperText={loginFormData['password'].helperText}
            onChange={handleFormChange}>
          </TextField>
          <Button type="submit" variant="outlined" sx={{mt: 2}} onClick={handleClickLoginBtn}>Login</Button>
        </Box>
        <Link href="#" sx={{mt: 2, textDecoration: 'none'}}><Typography>Forgot Password</Typography></Link>
        <Link href="/register" sx={{mt: 2, textDecoration: 'none'}}><Typography>Register an Account</Typography></Link>
      </PageContainer>
    </>
  )
}