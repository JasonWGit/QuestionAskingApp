import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';

export default function RegisterPage() {
  const [registerFormData, setRegisterFormData] = useState({
    email: { value: '', label: 'Email', error: false, helperText: ''},
    username: { value: '', label: 'Username', error: false, helperText: ''},
    password: { value: '', label: 'Password', error: false, helperText: ''},
    confirmPassword: { value: '', label: 'Confirm Password', error: false, helperText: ''},

  });

  const handleInputChange = (event) => {
    setRegisterFormData(prevData => {
      return {
        ...prevData,
        [event.target.name]: {
          ...prevData[event.target.name],
          value: event.target.value,
        }
      }
    });
  }

  const validateFormInput = (inputName) => {
    if (registerFormData[inputName].value.trim() === '') {
      setRegisterFormData(prevData => {
        return {
          ...prevData,
          [inputName]: {
            ...prevData[inputName],
            error: true,
            helperText: `${inputName} must not be empty`,
          }
        }
      })
      return false;
    }
    return true;
  }

  const checkPasswordsMatch = () => {
    if (registerFormData.password.value !== registerFormData.confirmPassword.value) {
      setRegisterFormData(prevData => {
        return {
          ...prevData,
          password: {
            ...prevData.password,
            error: true,
            helperText: 'Passwords do not match!'
          },
          confirmPassword: {
            ...prevData.confirmPassword, 
            error: true,
            helperText: 'Passwords do not match!'
          }
        }
      })
      return false;
    } else {
      setRegisterFormData(prevData => {
        return {
          ...prevData,
          password: {
            ...prevData.password,
            error: false,
            helperText: ''
          },
          confirmPassword: {
            ...prevData.confirmPassword, 
            error: false,
            helperText: '',
          }
        }
      })
      return true;
    }
  }

  const handleClickRegisterBtn = (event) => {
    event.preventDefault();

    let errorFound = false;

    errorFound = !checkPasswordsMatch();

    for (const inputName of Object.keys(registerFormData)) {
      errorFound = !validateFormInput(inputName);
    }

    
    if (errorFound) {
      return;
    }
  }

  return (
    <>
      <PageContainer>
        <Typography variant="h4">Register A New Account</Typography>
        <Box component="form" sx={{mt: 3, display: 'flex', flexDirection: 'column', gap: 2}}>
          {Object.entries(registerFormData).map(([inputName, data]) => 
            <TextField
              name={inputName}
              label={data.label}
              value={data.value}
              error={data.error}
              helperText={data.helperText}
              onChange={handleInputChange}
            >

            </TextField>
          )}
          <Button type="submit" variant="outlined" onClick={handleClickRegisterBtn}>Register</Button>
        </Box>
      </PageContainer>
    </>
  )
}