import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email, password };

        axios.post(`${REACT_APP_SERVER_URL}/controllers/users/login`, userData)
        .then(response => {
            const { token } = response.data;

            // SAVE TOKEN TO LOCAL STORAGE
            localStorage.setItem('jwtToken', token);
            //SET TOKEN TO AUTH HEADER
            setAuthToken(token);
            // DECODE TOKEN TO GET THE USER DATA
            const decoded = jwt_decode(token);
            // SET CURRENT USER
            props.nowCurrentUser(decoded);
         })
         .catch(error => {
             console.log(error)
         })
    }


    if (props.user) return <Redirect to='/profile' />

    return (
        <div className='row mt-4'>
            <div className='col-md-7 offset-md-3'>
                <div className='card card-body'>
                    <h2 className='py-2'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className='form-control' />
                        </div>
                        <button type='submit' className='btn btn-primary float-right'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;