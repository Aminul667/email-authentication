import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

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

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess('User logged in successful');
            setError('');
        })
        .catch(error => {
            setError(error.message);
        });
    }

    const handleResetPassword = event => {
      const email = emailRef.current.value;
      if(!email){
        alert('Please provide your email to reset your password');
        return;
      }
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your mail');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      })
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
            ref={emailRef}
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
      <p><small>Forget password? <button className="btn btn-link" onClick={handleResetPassword}>Reset Password</button></small></p>
      <p><small>New to this page? Please <Link to="/register">Register</Link></small></p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
