import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar'
import Home from './components/Home'
import VideoDetail from './components/VideoDetail'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'
import Register from './components/Register'
import Search from './components/Search'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/videos/:videoId" element={ <VideoDetail /> } />
          <Route path="/search" element={ <Search /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
