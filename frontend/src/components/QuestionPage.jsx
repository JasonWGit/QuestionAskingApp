import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';
import Navbar from '../components/Navbar';
import { userLoggedInCheck } from './authHelpers.js';

// params { question_id }
export default function QuestionPage(props) {
  const { showErrorAlert, showSuccessAlert } = useAlert();
  const [questionData, setQuestionData] = useState();

  const params = useParams();
  // console.log(params.question_id);
  
  useEffect(() => {
    const fetchQuestionData = async () => {
      const { data, error } = await supabase.from('questions').select('*').eq('id', params.question_id);
      console.log(data);
      setQuestionData(data[0]);
    }

    fetchQuestionData();
  }, []);


  return (
    <>
      <Navbar></Navbar>
      {questionData && 
      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1}}>
        <Box sx={{display: 'flex', flexDirection: 'column', p: 6, width: '70%' }}>
          <Typography variant="h4">
            {questionData.question_title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <Typography variant="caption">
              Created: {new Date(questionData.created_at).toLocaleString('en-US', {
                dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Sydney'
              })}
            </Typography>
            <Typography variant="caption">
              Status: {questionData.status}
            </Typography>
          </Box>
          
          <Box sx={{mt: 3}}>
            <Typography>
              {questionData.question_body}
            </Typography>

            
          </Box>
          
          {<Box sx={{ mt: 8, border: '3px solid #1f883d', p: 3}}>
            <Typography sx={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              Placeholder Answer 1. I think you're doing a great job to start off
            </Typography>
          </Box>}
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5}}>
            <Typography>
              Jason: Placeholder comment
            </Typography>
            <Typography>
              Jason: Placeholder comment
            </Typography>
            <Typography>
              Jason: Placeholder comment
            </Typography>
            
          </Box>
        </Box>
      </Box>}
    </>
  )
}