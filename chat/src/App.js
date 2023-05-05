import './App.css';
import React from "react"
import Navbar from './components/navbar';
import SignupPage from './components/signup_page';
import HomePage from "./components/home_page"
import LoginPage from './components/login_page';
import Chat from "./components/chat_page"
import {Route, Routes,BrowserRouter as  Router} from "react-router-dom"

function App() {


  return (
    
    <div className='h-screen flex justify-center align-center'>
  <Router>
      <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/login_page" element={<LoginPage />}></Route>
        <Route path="/signup_page" element={<SignupPage />}></Route>
        <Route path="/chat_page" element={<Chat />}></Route>
      </Routes>
      </>

    </Router>
  </div>


  );
}

export default App;
