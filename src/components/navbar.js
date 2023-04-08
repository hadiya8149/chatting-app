import React from 'react';
import {  NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light ">
        <NavLink exact="true" activeclassname="active" className="navbar-brand" to="/">Chat<br/>App</NavLink>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a alt="link to home page" className="nav-link" href="/">Home </a>
            </li>
            <li className="nav-item">
              <a alt="link to login page" className="nav-link" href="/login_page">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chat_page">Chat</a>
            </li>
            {/* <li className="nav-item">
              <a alt="link to login page" className="nav-link disabled" href="/"></a>
            </li> */}
          </ul>
        </div>
      </nav>

    )
    ;
}