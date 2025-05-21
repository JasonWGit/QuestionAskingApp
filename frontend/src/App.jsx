import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AlertProvider from './components/AlertContext';
import AlertBar from './components/AlertBar';
import './App.css'

function App() {

  return (
    <>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
        <AlertBar></AlertBar>
      </AlertProvider>
      
    </>
  )
}

export default App
