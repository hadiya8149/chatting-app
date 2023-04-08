import React, { useState } from 'react';
import axios from "axios"

export default function SignupPage(props) {
    
    
    const [signupForm, setSignupForm] = useState({
        username:"",
        email:"",
        password:"",
        password2:""

    })

    function handleChange(event){
        const updatedForm = {...signupForm, [event.target.name]:event.target.value}
        setSignupForm(updatedForm)
        // console.log(signupForm)
    }
    function isValidEmail(){
        return /\S+@\S+\.\S+/.test(signupForm.email);

    }
    function isValidPassword(){
        if ( (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/.test(signupForm.password)) && ( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/.test(signupForm.password2))){
            return true
        }
        else{
            return false
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        if (!isValidEmail()){
            alert("Invalid email");
             var x=document.getElementById("email");
            x.style.border="2px solid red";    
            }

        if (!isValidPassword()){
            alert("Password should contain one lowercase , uppercase, numeric digit and a special character.Should be between 8 to 10 characters long")
            var y = document.getElementById("password")
            y.style.border="2px solid red"
        }
        if (isValidEmail && isValidPassword){
            console.log("signed in ");
            try{
                await axios.post("http://localhost:9000/signupAPI", {
                    username:signupForm.username,
                    email:signupForm.email,
                    password:signupForm.password
                })
            }
            catch (e){
                console.log(e)
            }
    
        }
    }

    return (

            <div className='main-content'>
                <div className='sides'></div>
                <div className=' form-panel p-5 d-flex flex-column w-100 '>
                    <form id="signup-form" onSubmit={handleSubmit} method="post">
                        <div className="form-group row mb-12"><a alt="Sign in link" href="/login_page"> Already Registered? Sign in </a></div>
                        <div className="form-group row mb-12">
                               <input type="text" className="form-control" name="username" onChange={handleChange} value={signupForm.username}  id="username" placeholder="username" /></div>
                        <div className="form-group row mb-12">
                            <input type="text" className="form-control" name="email" onChange={handleChange} value={signupForm.email}  id="email" placeholder="Email" /></div>
                        <div className="form-group row mb-12"><input type="password" onChange={handleChange} className="form-control mt-3" value={signupForm.password} name="password" id="password" placeholder="Password" /></div>
                        <div className="form-group row mb-12"><input type="password" onChange={handleChange} className="form-control mt-3" name="password2" id="password2" placeholder="Confirm Password" /></div>


                        <div className="form-group row mb-12"><button type="Submit" className="btn btn-primary btn-md my-3 w-100 ">Signup</button></div>
                    </form>


                </div>
                <div className='sides'></div>
            </div>
        )
    }
