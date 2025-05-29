import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';

export default function QuestionCard(props) {
  const navigate = useNavigate();
  const handleClickQuestionCard = () => {
    navigate(`/question/${props.questionId}`);
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'white', px: 1, border: '1px solid grey', display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': {
        backgroundColor: 'lightgrey'
      }}} onClick={handleClickQuestionCard}>
        <Typography sx={{fontSize: '1.2rem', maxWidth: 300, overflow: 'hidden'}}>
          {props.questionTitle}
        </Typography>
        <Typography sx={{ml: 'auto'}}>
          {props.questionStatus}
        </Typography>
      </Box>
    </>
  )
}
