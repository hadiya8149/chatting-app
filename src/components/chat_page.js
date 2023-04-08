import React, {useState, useEffect} from "react";
import logo from "../girl.png"
import axios from "axios"
export default function Chat(){
    const [usersList, setusersLists] = useState([])
    const [message, setMessage] = useState("")
    function handleChange(event){
        setMessage(event.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        if(message){
            var input = document.getElementById("message-input")
            setMessage("")
            input.value=""
        }

    }
    useEffect(()=>
    {
        async function fetchUsers(){
            try{
                axios.get("http://localhost:9000/peopleAPI/")
                .then((response)=> setusersLists(response.data))                   
                .catch((error)=>{
                    console.log(error);
                })
            }
            catch(error){
                console.log(error)
            }
   
                }
            fetchUsers();
            }
    ,[usersList]);
    if(!usersList.length) return <h3>LOading...</h3>
    return(
        <div className="flex main-content">
            <div className="left-sidebar-chat sidebar-chat container ">
               
                <div className="logo">
                    <img id="logo" alt="female icon" src={logo}></img>
                </div>
                <span>My Dashboard</span>
                
                <hr/>
                <div>
                    <div>
                        Messages
                    </div>
                    <div>
                       
                    </div>
                </div>
            </div>
            <div className=" chat-section ">
                    <div className="messages"></div>
                    <div className="message-box">
                        <form id="messaging-form" onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-center">
                                <div className="input-group ">
                                <input id="message-input" className="col-sm-1 col-form" type="text" onChange={handleChange} value={message.value} name="message" placeholder="Type message and hit enter"/>
                       
                       <button type="Submit"  id="send-message">Send</button>
                                </div>
                            </div>
                               
                        
                        </form>
                </div>
            </div>
            <div className="sidebar-chat  "> 
            <div>People</div>
            <ul>
            {usersList.map((user)=>(
                <li ><button className="user" type="submit">{user}</button></li>
            ))}
            </ul>
            </div>
        </div>
    );
}