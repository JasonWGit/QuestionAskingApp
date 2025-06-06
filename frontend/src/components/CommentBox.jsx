import { Box, TextField, Typography, Button, Link  } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase.js';
import { useAlert } from './AlertContext.jsx';
import Navbar from '../components/Navbar';
import { userLoggedInCheck, getUser } from './authHelpers.js';

export default function CommentBox(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser().then(data => {
      if (data?.user) {
        setUser(data.user.id);
      }
    });

  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5}}>
        {props.comments && props.comments.map(comment => 
          <Typography sx={{ wordBreak: 'break-word' }}>
            {new Date(comment.created_at).toLocaleString('en-US', {
            dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Sydney'
          })} <b>{comment.username}</b>: {comment.comment} + {comment.user_id === user && 'can delete'}
          </Typography>)}
      </Box>
    </>
  )
}