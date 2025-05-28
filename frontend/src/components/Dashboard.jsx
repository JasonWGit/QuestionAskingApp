import { Box, TextField, Typography, Button, Link } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar></Navbar>
      <PageContainer>
        <Typography>
            This is the dashboard
        </Typography>
      </PageContainer>
    </>
    
  )
}