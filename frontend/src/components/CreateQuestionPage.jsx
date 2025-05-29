import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';
import Navbar from '../components/Navbar';

export default function CreateQuestionPage() {
  const initialCreateQuestionFormState = {
    questionTitle: { value: '', error: false, helperText: '', inputName: 'questionTitle'},
    questionBody: { value: '', error: false, helperText: '', inputName: 'questionBody'}
  };

  const navigate = useNavigate();

  const { showSuccessAlert, showErrorAlert } = useAlert();

  const [createQuestionFormData, setCreateQuestionFormData] = useState(initialCreateQuestionFormState);

  const handleInputChange = (event) => {
    setCreateQuestionFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: {
          ...prevData[event.target.name],
          value: event.target.value,
          error: false,
          helperText: ''
        }
      }
    });
  }

  const validateFormInput = () => {
    let errorFound = false;
    if (createQuestionFormData.questionTitle.value.length < 10) {
      setCreateQuestionFormData(prevData => {
        return {
          ...prevData,
          questionTitle: {
            ...prevData.questionTitle,
            error: true,
            helperText: 'Title must be at least 10 characters'
          }
        }
      });
      errorFound = true;
    }

    if (createQuestionFormData.questionBody.value.length < 10) {
      setCreateQuestionFormData(prevData => {
        return {
          ...prevData,
          questionBody: {
            ...prevData.questionBody,
            error: true,
            helperText: 'Body must be at least 10 characters'
          }
        }
      });
      errorFound = true;
    }

    return errorFound;
  }

  const handleClickSubmit = async () => {
    const errorFound = validateFormInput();
    if (errorFound) {
      return;
    }
    
    const { data, error } = await supabase.from('questions').insert([{
      question_title: createQuestionFormData.questionTitle.value,
      question_body: createQuestionFormData.questionBody.value
    }]);

    if (error) {
      showErrorAlert(`${error.code}: ${error.message}`);
      return;
    }

    showSuccessAlert('Successfully created new question');
    navigate('/dashboard');
  }

  return (
    <>
      <Navbar></Navbar>
      <Box sx={{display: 'flex', flexDirection: 'column', px: 5, py: 5}}>
        <Typography variant="h4">Create a new question</Typography>
        <Box component="form" sx={{mt: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Question Title</Typography>
          <TextField 
            variant="outlined" 
            sx={{ width: '100%' }} 
            onChange={handleInputChange}
            name={initialCreateQuestionFormState.questionTitle.inputName}
            value={createQuestionFormData.questionTitle.value}
            error={createQuestionFormData.questionTitle.error}
            helperText={createQuestionFormData.questionTitle.helperText}
          />

          <Typography sx={{ mt: 3 }}>Question Body</Typography>
          <TextField 
            variant="outlined" 
            multiline 
            minRows={8} 
            maxRows={12} 
            sx={{ width: '100%' }} 
            onChange={handleInputChange}
            name={initialCreateQuestionFormState.questionBody.inputName}
            value={createQuestionFormData.questionBody.value}
            error={createQuestionFormData.questionBody.error}
            helperText={createQuestionFormData.questionBody.helperText}
          />
          <Button variant="contained" sx={{ ml: 'auto', mt: 3, textTransform: 'none', backgroundColor: '#1f883d', fontWeight: '500' }} onClick={handleClickSubmit}>
            Create Question
          </Button>
        </Box>
        
      </Box>
    </>
  )
}