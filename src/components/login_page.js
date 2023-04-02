import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function LoginPage(props) {
    
    
    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",

    })

    function handleChange(event){
        const updatedForm = {...loginForm, [event.target.name]:event.target.value}
        setLoginForm(updatedForm)
        // console.log(loginForm)
    }
    function isValidEmail(){
        return /\S+@\S+\.\S+/.test(loginForm.email);

    }
    function isValidPassword(){
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/.test(loginForm.password);
    }
//     const DataInputBox =()=>{
//         const inputRef=React.useRef(null);
//     } 
//     React.useEffect(() => {
//         ReactTooltip.show(inputRef.current);
//    }, []);
    function handleSubmit(event){
        event.preventDefault()
        var m = event.target["target"]["id"]
        switch(m){
            case "signup-form":
                console.log("this is signin request")
                break;
            case "login-form":
                console.log("this is signup request")
                break;
            default:
                console.log("blabla")

        }
        console.log(loginForm)

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
                    <form id="login-form" method="post" onSubmit={handleSubmit}>

                        <div className="form-group row mb-12">
                           <ReactTooltip id="tooltip"  effect="solid" place="right"></ReactTooltip>
                            <input type="text" className="form-control" onChange={handleChange} title="invalid email" data-tip="Invalid emai" value={loginForm.email} name="email" id="email" placeholder="Email or username" /></div>
                        <div className="form-group row mb-12"><input type="password" className="form-control mt-3" onChange={handleChange} value={loginForm.password} name="password" id="password" placeholder="Password" /></div>
                        <div className="form-check mt-4 w-100"><label className="form-check-label text-dark "><input type="checkbox" name="remember" className="form-check-input" />Remember me</label></div>
                        <div className="form-check mt-4 w-100"><a alt="create an account" href="/signup_page" >Create an account</a></div>

                        <div className="form-group row mb-12"><button type="Submit"  className="btn btn-primary btn-md my-3 w-100 ">Login</button></div>

                    </form>

                </div>
                <div className='sides'></div>
            </div>

        )
    

}
