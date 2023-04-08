import './App.css';
import React from "react"
import {io} from 'socket.io-client';
import Navbar from './components/navbar';
import SignupPage from './components/signup_page';
import HomePage from "./components/home_page"
import LoginPage from './components/login_page';
import Chat from "./components/chat_page"
import {Route, Routes,BrowserRouter as  Router} from "react-router-dom"

function App() {
  
  const [time, setTime] =React.useState('fetching');
  React.useEffect(()=>{
    const socket = io('ws://localhost:5000/')
    socket.on('connect', ()=>console.log("THIS IS SOCKET ID",socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    }, [])
   socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))
   
 },[])
 console.log(time)
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
