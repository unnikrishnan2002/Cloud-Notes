import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Cloud Notes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-success" role="button" to="/login">Login</Link>
          </form> : <button className='btn btn-success' onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar