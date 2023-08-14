import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar'
import Home from './components/Home'
import VideoDetail from './components/VideoDetail'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/videos/:videoId" element={ <VideoDetail /> } />
      </Routes>
    </Router>
  )
}

export default App
