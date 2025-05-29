import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';
import Navbar from '../components/Navbar';

export default function QuestionPage(props) {
  

  return (
    <>
      <Navbar></Navbar>
      <PageContainer>
        This is a question page
      </PageContainer>
    </>
  )
}