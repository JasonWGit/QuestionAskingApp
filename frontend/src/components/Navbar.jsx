import { Box, TextField, Typography, Button, Link, AppBar, Toolbar } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase';
import { useLoginSession } from './LoginSessionContext.jsx';
import { useAlert } from './AlertContext.jsx';


export default function Navbar() {
  const [loginSession, setLoginSession] = useState(null);
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        showErrorAlert(`${error.code}: ${error.message}`);
        return;
      }
      // console.log(data);
      setLoginSession(data.session);
    }

    fetchLoginSession();
  }, []);

  const handleClickLogout = async () => {
    console.log(loginSession);
    const { error } = await supabase.auth.signOut();
    if (error) {
      showErrorAlert(`${error.code}: ${error.message}`);
    } else {
      showSuccessAlert('Successfully logged out');
      navigate('/');
    }
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography>
          Question Asking App
        </Typography>
        {loginSession && <Button variant="outlined" color="inherit" onClick={handleClickLogout}>
          Logout
        </Button>}
      </Toolbar>
    </AppBar>
  )
}