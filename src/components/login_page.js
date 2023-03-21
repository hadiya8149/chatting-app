import React from 'react';
export default function LoginPage(){
    return(

        <div className='main-content'>
            <div className='sides'></div>
            <div className=' form-panel p-5 d-flex flex-column w-100 bg-light'>
                <form id="login-form" method="post">

                <div className="form-group row mb-12">
                    <input type="text" className="form-control" name="email" id="email" placeholder="Email or username"/></div>
                    <div className="form-group row mb-12"><input type="text" className="form-control mt-3" name="password" id="password" placeholder="Password"/></div>
                    <div className="form-check mt-4 w-100"><label className="form-check-label text-dark "><input type="checkbox" name="remember" className="form-check-input"/>Remember me</label></div>
                    <div className="form-group row mb-12"><button type="Submit" className="btn btn-primary btn-md my-3 w-100 ">Login</button></div>

                </form>
            
            
            </div>
            <div className='sides'></div>
        </div>
    );
}