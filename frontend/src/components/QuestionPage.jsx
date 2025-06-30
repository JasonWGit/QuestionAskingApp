import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';
import Navbar from '../components/Navbar';
import { userLoggedInCheck, getUser } from './authHelpers.js';
import CommentBox from './CommentBox.jsx';
import { getUserRole } from './authHelpers.js';

// params { question_id }
export default function QuestionPage(props) {
  getUser();
  const { showErrorAlert, showSuccessAlert } = useAlert();
  const [questionData, setQuestionData] = useState();
  const [answerData, setAnswerData] = useState();
  const [comments, setComments] = useState();
  const [userRole, setUserRole] = useState();
  

  const initialCommentFormState = { 
    value: '',
    error: false,
    helperText: ''
  }
  const [commentFormData, setCommentFormData] = useState(initialCommentFormState);
  const [answerFormData, setAnswerFormData] = useState(initialCommentFormState);

  const params = useParams();
  // console.log(params.question_id);
  
  const fetchComments = async () => {
    const { data, error } = await supabase.rpc('get_question_comments', { input_question_id: params.question_id });
    // console.log(data);
    if (data.length > 0) {
      setComments(data);
    }
  }

  const fetchQuestionData = async () => {
      const { data, error } = await supabase.from('questions').select('*').eq('id', params.question_id);
      if (error) {
        showErrorAlert('Failed to fetch question');
        return;
      }
      if (data.length > 0) {
        setQuestionData(data[0]);
      } else {
        showErrorAlert('Question does not exist!'); // probably change th
      }
      
    }
    
    const fetchAnswerData = async () => {
      // const { data, error } = await supabase.from('question_answers').select('*').eq('question_id', params.question_id);
      const { data, error } = await supabase.rpc('get_question_answer', { target_question_id: params.question_id });
      // setAnswerData(data[0]);
      if (error) {
        showErrorAlert('Failed to fetch answer');
        return;
      }
      if (data.length > 0) {
        setAnswerData(data[0]);
      }
    }

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(() => role);
    }

    fetchQuestionData();
    fetchAnswerData();
    fetchComments();
    fetchUserRole();
  }, []);

  const handleCommentFormChange = (event) => {
    setCommentFormData((prevData) => {
      return {
        ...prevData,
        value: event.target.value,
        error: false,
        helperText: ''
      }
    });
  }

  const handleClickSubmitComment = async (event) => {
    event.preventDefault();
    if (commentFormData.value.trim().length == 0) {
      setCommentFormData((prevData) => {
        return {
          ...prevData,
          error: true,
          helperText: `Comment must not be empty`
        }
      });
      return;
    }

    const { data: sessionData, error: sessionError, loggedIn } = await userLoggedInCheck();
    if (!loggedIn) {
      showErrorAlert(sessionError);
      return;
    }

    const { data, error: createCommentError } = await supabase.from('question_comments').insert([{
      question_id: params.question_id,
      user_id: sessionData.session?.user?.id,
      comment: commentFormData.value
    }]);

    if (createCommentError) {
      showErrorAlert(`${createCommentError.code}: ${createCommentError.message}`);
      return;
    }

    setCommentFormData(() => initialCommentFormState);
    showSuccessAlert('Successfully created new comment');
    fetchComments(); // fetch comments again after inserting the new comment so that the new comment appears without needing a page refresh 
  }

  const handleAnswerFormChange = (event) => {
    setAnswerFormData((prevData) => {
      return {
        ...prevData,
        value: event.target.value,
        error: false,
        helperText: ''
      }
    });
  }

  const handleClickSubmitAnswer = async (event) => {
    event.preventDefault();
    const { data: sessionData, error: sessionError, loggedIn } = await userLoggedInCheck();
    if (!loggedIn) {
      showErrorAlert(sessionError);
    }

    // probably check here if the question is answered already or not or insert a check in the 

    // also probably check if the question exists or not
    const {data: questionStatusUpdateData, error: questionStatusUpdateError } = await supabase.from('questions').update({ status: 'Answered' }).eq('id', params.question_id);

    if (questionStatusUpdateError) {
      showErrorAlert(`${questionStatusUpdateError.code}: ${questionStatusUpdateError.message}`);
      return;
    }

    const { data, error } = await supabase.from('question_answers').insert([{
      question_id: params.question_id,
      user_id: sessionData.session.user.id,
      answer: answerFormData.value,
    }]);

    if (error) {
      showErrorAlert(`${error.code}: ${error.message}`);
      return;
    }



    setAnswerFormData(initialCommentFormState);
    showSuccessAlert('Successfully answered question');

    fetchAnswerData();
    fetchQuestionData();
  }

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
          
          {answerData && <Box sx={{ mt: 8, border: '3px solid #1f883d', p: 3}}>
            <Typography variant="caption">
              Answered by {answerData.username} on {new Date(answerData.created_at).toLocaleString('en-US', {
                dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Sydney'
              })}
            </Typography>
            <Typography sx={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {answerData.answer}
            </Typography>
          </Box>}
          {/* <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5}}>
            {comments && comments.map(comment => 
              <Typography sx={{ wordBreak: 'break-word' }}>
                {new Date(comment.created_at).toLocaleString('en-US', {
                dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Sydney'
              })} <b>{comment.username}</b>: {comment.comment}
              </Typography>)}
          </Box> */}

          {questionData.status === 'Unanswered' && userRole === 'admin' && 
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', mt: 3}}> 
            <TextField
              label="Provide an answer"
              multiline
              fullWidth
              minRows={1}
              maxRows={12}
              onChange={handleAnswerFormChange}
            ></TextField>
            <Button type="submit" variant="outlined" sx={{mt: 2, width: '40%', minWidth: 170}} onClick={handleClickSubmitAnswer}>Submit answer</Button>
          </Box>
          
          }

          {comments && <CommentBox comments={comments}/>}
          
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3}}>
            <TextField 
              multiline
              fullWidth
              label="Add a comment" 
              value={commentFormData.value}
              error={commentFormData.error}
              helperText={commentFormData.helperText}
              onChange={handleCommentFormChange}
            ></TextField>
            <Button type="submit" variant="outlined" onClick={handleClickSubmitComment}>Add comment</Button>
          </Box>
        </Box>
      </Box>}
    </>
  )
}