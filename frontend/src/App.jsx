import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import StudentDashboard from './components/StudentDashboard.jsx';
import AlertProvider from './components/AlertContext';
import AlertBar from './components/AlertBar';
import './App.css'
import LoginSessionProvider from './components/LoginSessionContext';
import QuestionPage from './components/QuestionPage.jsx';
import CreateQuestionPage from './components/CreateQuestionPage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {

  return (
    <>
      <LoginSessionProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/question/:question_id" element={<QuestionPage />}/>
              <Route path="/question/create" element={<CreateQuestionPage />} />
              <Route path="/admin_dashboard" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
          <AlertBar></AlertBar>
        </AlertProvider>
      </LoginSessionProvider>
    </>
  )
}

export default App
