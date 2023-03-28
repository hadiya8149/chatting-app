import React, { useState } from 'react';
export default function LoginPage(props) {

    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",

    })
    let[authMode, setAuthMode] = useState("signin");
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    }

    function handleChange(event){
        const updatedForm = {...loginForm, [event.target.name]:event.target.value}
        setLoginForm(updatedForm)
        // console.log(loginForm)
    }
    function isValidEmail(){
        return /\S+@\S+\.\S+/.test(loginForm.email);

    }
    function handleSubmit(event){
        event.preventDefault()
        console.log(loginForm)

        console.log(isValidEmail)
        if (!isValidEmail()){
            alert("Invalid email")

        }
        else{
            console.log("signed in successfully")

        }
    }

    // function handleEmailChange(e){
    //     setEmail(e);
    //     console.log(email);
    // }

    // function handlePasswordChange(e){

    // }
    if(authMode === "signin") {
        return (
            <div className='main-content'>
                <div className='sides'></div>
                <div className=' form-panel p-5 d-flex flex-column w-100 '>
                    <form id="login-form" method="post" onSubmit={handleSubmit}>

                        <div className="form-group row mb-12">
                            <input type="text" className="form-control" onChange={handleChange} value={loginForm.email} name="email" id="email" placeholder="Email or username" /></div>
                        <div className="form-group row mb-12"><input type="password" className="form-control mt-3" onChange={handleChange} value={loginForm.password} name="password" id="password" placeholder="Password" /></div>
                        <div className="form-check mt-4 w-100"><label className="form-check-label text-dark "><input type="checkbox" name="remember" className="form-check-input" />Remember me</label></div>
                        <div className="form-check mt-4 w-100"><span onClick={changeAuthMode} >Create an account</span></div>

                        <div className="form-group row mb-12"><button type="Submit"  className="btn btn-primary btn-md my-3 w-100 ">Login</button></div>

                    </form>

                </div>
                <div className='sides'></div>
            </div>

        )
    }
else{
        return (

            <div className='main-content'>
                <div className='sides'></div>
                <div className=' form-panel p-5 d-flex flex-column w-100 '>
                    <form id="signup-form" method="post">
                        <div className="form-group row mb-12"><span onClick={changeAuthMode}> Already Registered? Sign in </span></div>

                        <div className="form-group row mb-12">
                            <input type="text" className="form-control" name="email" onChange={handleChange} value={loginForm.email}  id="email" placeholder="Email or username" /></div>
                        <div className="form-group row mb-12"><input type="text" onChange={handleChange} className="form-control mt-3" value={loginForm.password} name="password" id="password" placeholder="Password" /></div>
                        <div className="form-group row mb-12"><input type="text" onChange={handleChange} className="form-control mt-3" name="password" id="password" placeholder="Confirm Password" /></div>


                        <div className="form-group row mb-12"><button type="Submit" className="btn btn-primary btn-md my-3 w-100 ">Signup</button></div>
                        <label>An email has been sent successfully for authorization.</label>
                    </form>


                </div>
                <div className='sides'></div>
            </div>
        )
    }
}
