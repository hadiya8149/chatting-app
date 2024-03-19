import './App.css';
import React, {useEffect} from "react"
import SignupPage from './components/signup_page';
import LoginPage from './components/login_page';
import Chat from "./components/chat_page";
import {Route, Routes,BrowserRouter as  Router} from "react-router-dom"
// import {io} from "socket.io-client"
// var socket = io("http://localhost:9000",
// { transports: ["websocket"],
// withCredentials: true }
// );


function App() {
  

  
  return (
    
    // <div className='h-screen flex justify-center align-center'>
  <Router>
      <Routes>
        <Route path="/" index element={<LoginPage />}></Route>
        <Route path="/signup_page" element={<SignupPage />}></Route>
        <Route path="/chat_page" element={<Chat />}></Route>
      </Routes>

    </Router>
  // </div>


  );
}

export default App;
