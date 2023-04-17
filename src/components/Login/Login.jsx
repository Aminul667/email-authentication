import React, { useState } from "react";

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please Enter at least two upcases');
            return ;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please add a special character!');
            return ;
        }
        else if(password.length < 6){
            setError('Please Enter a six length password')
            return;
        }
    }

  return (
    <div className="w-25 mx-auto">
        <h2>Please Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
