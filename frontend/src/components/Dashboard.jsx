import { Box, TextField, Typography, Button, Link } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from './PageContainer';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import { getUserRole } from './authHelpers';

export default function Dashboard() {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const [userRole, setUserRole] = useState('loading');

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
    }

    fetchRole();
  }, []);
  
  const roleDashboards = {
    "loading": <>Loading</>, // replace with a generic loading screen
    "admin": <AdminDashboard />,
    "user": <StudentDashboard />,
  }

  return (
    <>
      {roleDashboards[userRole]}
    </>
  )
}