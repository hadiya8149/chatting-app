import React from 'react';
export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-brand" href="/">Chat<br/>App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Chat</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/"></a>
            </li>
          </ul>
        </div>
      </nav>

    )
    ;
}