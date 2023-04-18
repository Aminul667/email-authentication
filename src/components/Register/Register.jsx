import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email, password, name);

        // validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase');
            return ;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset()
            setSuccess('User has been registered successfully');
            sendVerificationEmail(result.user);
            updateUserData(result.user, name)


        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        });
    }

    const sendVerificationEmail = user => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert('Please verify your email address');
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
        .then(() => {
            console.log('User name updated');
        })
        .catch(error => {
            setError(error.message);
        })
    }

    const handleEmailChange = (event) => {
        // setEmail(event.target.value);

    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded' type="text" name="name" id="name" placeholder='Your Name' required/>
                <br />
                <input className='w-50 mb-4 rounded' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required/>
                <br />
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;