import { Box, TextField, Typography, Button, Link } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from('questions').select('*');
      setQuestionList(() => data);
    }
    fetchQuestions();
  }, []);

  const handleClickAskQuestionBtn = () => {
    navigate('/question/create');
  }

  return (
    <>
      <Navbar></Navbar>
      <Typography variant="h3" sx={{fontStyle: 'italic', ml: 3, mt: 3}}>Dashboard</Typography>
      <Button sx={{ backgroundColor: 'lightgrey', mx: 3}} 
        onClick={handleClickAskQuestionBtn}
      >Ask a new question</Button>
      <Box sx={{p: 3}}>
        <Typography variant="h4">
          Your Questions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', px: 2, py: 2, borderRadius: '15px', maxWidth: 500, minWidth: 400, minHeight: 200}}>
          {questionList.map(question => <QuestionCard
            questionId={question.id}
            questionTitle={question.question_title}
            questionStatus={question.status}
          />
          )}
        </Box>
      </Box>
    </>
    
  )
}