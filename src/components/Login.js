import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Login Successfull", "success");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mx-5">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
        </div>

        <div className="mb-3 mx-5">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
        </div>

        <div id="emailHelp" className="form-text d-flex justify-content-end mx-5">Don't have an account ? Signup here</div>

        <div className="row  mx-5">

        <div className="col-md-6">
        <button type="submit" className="btn btn-primary" >Submit</button>
        </div>

        <div className="col-md-6 d-flex justify-content-end">
        <Link role="button" to="/signup" className="btn btn-primary" >SignUp</Link>
        </div>

        </div>
      </form>
    </div>
  )
}

export default Login