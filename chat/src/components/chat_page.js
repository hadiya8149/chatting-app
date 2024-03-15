import React, { useState, useEffect, useRef } from "react";
import logo from "../girl.png"
import axios from "axios"

import {io} from "socket.io-client"
// const token="My JWT";
// const token=req.cookies.token
var socket = io("http://localhost:9000",
{ transports: ["websocket"] }
);
export default function Chat() {
    const [usersList, setusersLists] = useState([])
    const [message, setMessage]=useState("")
    const [messages, setMessages]=useState([])
    const isFirstRender = useRef(true)
    const sessionID = localStorage.getItem("sessionID");
    


    useEffect(()=>{
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
          }
        const addMessage = (msg)=> setMessages(prevMessages=>[...prevMessages, msg])

        socket.on('chat message', addMessage);
         return ()=>{
            socket.off('chat message', addMessage);
        }
        
          
        }, [sessionID])

    
    function handleSubmit(event){
        event.preventDefault();
        if(socket.connected){
                console.log("socket conected", message, socket.userID)
                socket.emit("chat message", {message})
    }
        else{
            console.log("socket not connected");
    }
            // msgRender.current = false;

            
        
    }
    function handleChange(event){
        event.preventDefault();
        setMessage(event.target.value);
    }
    async function fetchUsers() {
        try {
            axios.get("http://localhost:9000/api/peopleAPI")
                .then((response) => setusersLists(response.data))
                .catch((error) => {
                    console.log(error.response.data);
                })
                .then((data) => console.log(data))
        }
        catch (error) {
            console.log(error)
        }


    }
    useEffect(() => {
        //subscribe once

        if (isFirstRender.current) {
            fetchUsers();
            isFirstRender.current = false;
        }
        else {
            console.log("i am rendered multiple times")
        }

//unssubscribe on mount
    }
        , []);
    if (!usersList.length) return <h3>LOading...</h3>


    return (
        <div className="flex main-content">
            <div className="left-sidebar-chat sidebar-chat container ">

                <div className="logo">
                    <img id="logo" alt="female icon" src={logo}></img>
                </div>
                <span>My Dashboard</span>

                <hr />
                <div>
                    <div>
                        Messages
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className=" chat-section ">
                <div className="messages">
                    <ul id="messages">
                    {messages.map((msg, index) => (
                        <li key={index}>{msg.message}
                        <span className="time-right">
                            9:05
                        </span>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="message-box">
                    <form id="messaging-form" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div className="input-group ">
                                <input id="message-input" className="col-sm-1 col-form" type="text" onChange={handleChange} value={message.value} name="message" placeholder="Type message and hit enter" />

                                <button type="Submit" id="send-message">Send</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div className="sidebar-chat  ">
                <div>People you may know</div>
                <ul>
                    {usersList.map((user, index) => (
                        <li key={index}><button className="user" type="submit">{user}</button></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
