import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import {useCookies} from "react-cookie";


import {io} from "socket.io-client"
var socket = io("http://localhost:9000",
{ transports: ["websocket"] ,
withCredentials:true}
);


export default function Chat() {
    const AlwaysScrollToBottom = ()=>{
        const scrollMsgRef = useRef(null);
        useEffect(()=> scrollMsgRef.current.scrollIntoView());
        return <div ref={scrollMsgRef}/>;
    };
    const [cookies, removeCookie]=useCookies(['Username', 'TOKEN'])
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


    // function handleScrollToLatestMessage(){
    //     scrollMsgRef?.current?.scrollIntoView?.(false)
    // }

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
        // handleScrollToLatestMessage();   
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
        if (strDate){
            const x = new Date(strDate);
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const y= x.getHours();
            const z= x.getMinutes();
            const a = x.getDay()
            // const b = days[a]
            // console.log(y+":"+z)
            return (y+":"+z)
        }
        else{
            const newDate = new Date()
            const hours = newDate.getHours();
            const mins= newDate.getMinutes();
            return (hours+":"+mins)

        }
    }
    function checkUser(name){
        if (name===cookies.Username){
            return "self_user";

        }
        else{
            return "other_user"
        }
    }


    return (
        <>
        <div className="row h-100" >
                <div className="messages-container d-flex flex-column overflow-auto  col-8 ">
                    <div id="msgs_history" className=" messages p-2 flex-grow-1  mb-3 "  >
                        {msgHistory.map((msg, index) => (
                          
                          <React.Fragment key={msg._id}>
                          <div  className="user_name" >
                            
                            <span className="p-2">{msg.username}</span>
                            
                               

                                </div>
                            <div className={checkUser(msg.username)} >

                                    <div className="col d-inline-flex">{msg.message}</div>

                                    <div className="time-right ml-3 ">{printDate(msg.created_at)}</div>
                                </div>
                                </React.Fragment>
                        ))}
                        {messages.map((msg, index) => (
                        <div className="new_msg" key={index}>
                            <span className="message">
                            {msg.message}
                                </span>
                        <span className="time-right">
                           {printDate()}
                        </span>
                        <AlwaysScrollToBottom/>
                        </div>
                    ))}
                             {/* <div className="red" id="endDiv" ref={scrollMsgRef} /> */}


                    </div>
                    {/* <div className="new-container">
                    <div id="new_messages" className="messages d-inline-flex flex-column p-2  mb-3"  >
                    {messages.map((msg, index) => (
                        <div className="new_msg" key={index}>
                            <span className="message">
                            {msg.message}
                                </span>
                        <span className="time-right">
                            9:05
                        </span>
                        </div>
                    ))}
                    </div>
                    </div>
                    a */}

                <div className="message-box fixed-bottom m-2">
                    <form id="messaging-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input id="message-input" className="col-sm-1 col-form" type="text" onChange={handleChange} value={message.value} name="message" placeholder="Type message and hit enter" />

                                <button type="Submit" id="send-message">Send</button>
                            </div>


                    </form>
                </div>


            </div>


            <div className="sidebar-chat col-4 container  text-center">
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

                         </>

    );
}
