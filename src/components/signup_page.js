import React, { useState } from 'react';

export default function SignupPage(props) {
    
    
    const [signupForm, setSignupForm] = useState({
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

    function handleSubmit(event){
        event.preventDefault()
        // var m = event.target["target"]["id"]
        
        console.log(signupForm)

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
            console.log("signed in ")
        }
    }

    return (

            <div className='main-content'>
                <div className='sides'></div>
                <div className=' form-panel p-5 d-flex flex-column w-100 '>
                    <form id="signup-form" onSubmit={handleSubmit} method="post">
                        <div className="form-group row mb-12"><a alt="Sign in link" href="/login_page"> Already Registered? Sign in </a></div>

                        <div className="form-group row mb-12">
                            <input type="text" className="form-control" name="email" onChange={handleChange} value={signupForm.email}  id="email" placeholder="Email or username" /></div>
                        <div className="form-group row mb-12"><input type="password" onChange={handleChange} className="form-control mt-3" value={signupForm.password} name="password" id="password" placeholder="Password" /></div>
                        <div className="form-group row mb-12"><input type="password" onChange={handleChange} className="form-control mt-3" name="password2" id="password2" placeholder="Confirm Password" /></div>


                        <div className="form-group row mb-12"><button type="Submit" className="btn btn-primary btn-md my-3 w-100 ">Signup</button></div>
                        <label>An email has been sent successfully for authorization.</label>
                    </form>


                </div>
                <div className='sides'></div>
            </div>
        )
    }
