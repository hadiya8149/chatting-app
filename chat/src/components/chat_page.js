import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import {useCookies} from "react-cookie";


import {io} from "socket.io-client"
// const token="My JWT";
// const token=req.cookies.token
var socket = io("http://localhost:9000",
{ transports: ["websocket"] ,
withCredentials:true}
);


export default function Chat() {
    const scrollMsgRef = useRef(null);

    const [cookies, removeCookie]=useCookies(['Username', 'TOKEN'])
    // const usrname=cookies.Username
    var retrievedCookies  = cookies.TOKEN
    if (retrievedCookies === undefined){
        console.log(retrievedCookies)
        window.location.href="http://localhost:3000"

    }
    const [usersList, setusersLists] = useState([])
    const [message, setMessage]=useState("") // for onchanging input field
    const [messages, setMessages]=useState([]) // for socket.io listener
    const [msgHistory, setMsgHistory]=useState([]); // for fetching previous messages
    

    const isFirstRender = useRef(true)
    
        
    useEffect(()=>{
        const addMessage = (msg)=> setMessages(prevMessages=>[...prevMessages, msg])
        socket.on('chat message', addMessage);
         return ()=>{
            socket.off('chat message', addMessage);
        }});


    function handleScrollToLatestMessage(){
        scrollMsgRef?.current?.scrollIntoView?.({block: "end", inline: "nearest"})
    }

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
        handleScrollToLatestMessage();   
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
            .then((response)=>
            setMsgHistory(response.data.msg_history)
            // console.log(response.data.msg_history)
            )
            .catch((error)=>{
                console.log(error);
            })
            .then((data)=>console.log(data))
        }
        catch (error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        //subscribe once

        if (isFirstRender.current) {
            fetchUsers();
            fetchMessages();
            // console.log(msgHistory)
            isFirstRender.current = false;
        }
        else {
            console.log("i am rendered multiple times")
        }

//unssubscribe on mount
    });
    if (!usersList.length) return <h3>LOading...</h3>
    function printDate(strDate){
        const x = new Date(strDate);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const y= x.getHours();
        const z= x.getMinutes();
        const a = x.getDay()
        // const b = days[a]
        // console.log(y+":"+z)
        return (y+":"+z)
    }

    return (
        <div className="row h-100" >
                <div className="messages d-flex col-9 " >
                    <div id="msgs_history" className=" p-2  d-inline-flex flex-column mb-3 "  >
                        {msgHistory.map((msg, index) => (
                          
                          <>
                          <div  className="user_name" id={msg.user_id}>
                            
                            <span className="p-2">{msg.username}</span>
                            
                                <span className="time-right ml-3 ">{printDate(msg.created_at)}</span>

                                </div>
                            <div className="old_msg" key={index}>
                                    <div className="col d-inline-flex">{msg.message}</div>

                                </div>
                                </>
                        ))}

                    </div>
                    <ul id="messages" className="list-group" >
                    {messages.map((msg, index) => (
                        <li className="new_msg list-group-item" key={index}>
                            <span className="message fixed-bottom">
                            {msg.message}
                                </span>
                        <span className="time-right">
                            9:05
                        </span>
                        </li>
                    ))}
                    </ul>
                    <div className="red" ref={scrollMsgRef} />

                <div className="message-box fixed-bottom m-2">
                    <form id="messaging-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input id="message-input" className="col-sm-1 col-form" type="text" onChange={handleChange} value={message.value} name="message" placeholder="Type message and hit enter" />

                                <button type="Submit" id="send-message">Send</button>
                            </div>


                    </form>
                </div>
            </div>

            <div className="sidebar-chat col-3 container  text-center">
                <div>
                    <button type="Submit" onClick={handleLogout}  value="logout" className="btn btn-primary">Signout</button>
                </div>
                <div>People you may know</div>
                <div className="list-group">
                    {usersList.map((user, index) => (
                        <button type="button" className="list-group-item list-group-item-action" key={index}>{user}</button>
                    ))}
                </div>
            </div>
         </div>
    );
}
