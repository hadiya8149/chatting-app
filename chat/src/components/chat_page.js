import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import {useCookies} from "react-cookie";

import {io} from "socket.io-client"
// const token="My JWT";
// const token=req.cookies.token
var socket = io("http://localhost:9000",
{ transports: ["websocket"] }
);

export default function Chat() {
    const [cookies, removeCookie]=useCookies(['Username', 'TOKEN'])
    var retrievedCookies  = cookies.TOKEN
    if (retrievedCookies === undefined){
        console.log(retrievedCookies)
        window.location.href="http://localhost:3000"

    }
    const [usersList, setusersLists] = useState([])
    const [message, setMessage]=useState("")
    const [messages, setMessages]=useState([])
    const [msgHistory, setMsgHistory]=useState([]);
    const isFirstRender = useRef(true)
    console.log(msgHistory)
    const sessionID = localStorage.getItem("sessionID");
    // console.log(sessionID)

        
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

    function handleLogout(event){
        event.preventDefault();
        removeCookie(
            "Username"
        );
        removeCookie("TOKEN")
        console.log("hndle logout")
        axios.post("http://localhost:9000/api/logoutAPI")
        console.log("cookies", cookies.Username)
        window.location.href="http://localhost:3000"

    }
    function handleSubmit(event){
        event.preventDefault();
        if(socket.connected){
                console.log("socket conected", message, socket.userID)
                socket.emit("chat message", {message})
                axios.post("http://localhost:9000/api/chat_api", {
                    data:message,
                    token:cookies.TOKEN,
                    username:cookies.Username
                })
                .then(function (response){
                    console.log("response",response);
                })
                .catch (function(error){
                    console.log(error);
                });
                
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
    async function fetchMessages(){
        try{
            axios.get("http://localhost:9000/api/chat_api")
            .then((response)=>setMsgHistory(response.data.msg_history))
            .catch((error)=>{
                console.log(error);
            })
            .then((data)=>console.log(data))
        }
        catch (error){
            console.log(error)
        }
        console.log(msgHistory)
    }
    // fetchMessages();
    useEffect(() => {
        //subscribe once

        if (isFirstRender.current) {
            fetchUsers();
            fetchMessages();
            isFirstRender.current = false;
        }
        else {
            console.log("i am rendered multiple times")
        }

//unssubscribe on mount
    });
    if (!usersList.length) return <h3>LOading...</h3>


    return (
        <div className="flex main-content">

            <div className=" chat-section ">
                <div className="messages">
                    <ul id="msgs_history">
                        {msgHistory.map((msg, index) => (
                            <li key={index}>{msg.message}<span id={msg.user_id}>{msg.username}</span><span>{msg.created_at}</span> </li>
                        ))}
                    </ul>
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
                <div>
                    <button type="Submit" onClick={handleLogout}  value="logout" className="btn btn-primary">Signout</button>
                </div>
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
