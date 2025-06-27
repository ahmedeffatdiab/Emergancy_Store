import Joi from 'joi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ saveUserData }) {
    const navigate = useNavigate();

    const [User, setUser] = useState({
        email: '',
        password: '',
    });

    const [userError, setUserError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [serverValidation, setServerValidation] = useState('');

    // Handle input changes
    const getUserData = (e) => {
        const updatedUser = { ...User };
        updatedUser[e.target.name] = e.target.value;
        setUser(updatedUser);
    };

    // Joi validation schema
    const validationForm = () => {
        const Schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
                .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@gmail\\.com$'))
                .required()
                .messages({
                    'string.email': 'Email must be a valid email address',
                    'string.pattern.base': 'Email must be a valid Gmail address',
                    'any.required': 'Email is required',
                }),
            password: Joi.string()
                .min(6)
                .max(15)
                .required()
                .messages({
                    'string.min': 'Password must be at least 6 characters long',
                    'string.max': 'Password must be at most 15 characters long',
                    'any.required': 'Password is required',
                }),
        });

        return Schema.validate(User, { abortEarly: false });
    };

    // Send login data to server
    async function sendDataToServer() {
        try {
            const res = await axios.post('https://emergancy-api-kqk9.vercel.app/auth/login',
            {
                email: User.email,
                password: User.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
            console.log(res);
            if (res.data.message === 'Success') {
                console.log("wlsdf")
                localStorage.setItem('userToken', res.data.data.token);
                saveUserData();
                navigate('/');
                window.location.reload();
            } else {
                setIsLoading(false);
                setServerValidation(res.data.message || 'Login failed');
            }
        } catch (error) {
            setIsLoading(false);
             if (error.response && error.response.data) {
            setServerValidation(error.response.data.message || 'An error occurred during login.');
            } else {
                setServerValidation('An error occurred during login.');
            }

        console.error('Frontend login error:', error);
        }
    }

    // Submit login form
    const submitData = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validationResult = validationForm();

        if (validationResult.error) {
            setUserError(validationResult.error.details);
            setIsLoading(false);
        } else {
            setUserError([]);
            sendDataToServer();
        }
    };

    return (
        <div className="container">
            <div className="w-50 m-auto py-2 px-3 my-4 SignUp text-white">
                <div className="w-100 m-auto text-center">
                    <h2>Login</h2>
                </div>
                {serverValidation && (
                    <div className="alert alert-danger">{serverValidation}</div>
                )}

                <form onSubmit={submitData}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        onChange={getUserData}
                        className="rounded-3 ps-2 my-1 w-100"
                        name="email"
                        placeholder="Enter Email .."
                    />
                    {userError.find(err => err.context.key === 'email') && (
                        <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                            {userError.find(err => err.context.key === 'email').message}
                        </div>
                    )}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={getUserData}
                        className="rounded-3 ps-2 my-1 w-100"
                        name="password"
                        placeholder="Enter Password .."
                    />
                    {userError.find(err => err.context.key === 'password') && (
                            <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                                {userError.find(err => err.context.key === 'password').message}
                            </div>
                        )}
                    <button type="submit" className="btn btn-info my-2">
                        {isLoading ? (
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <div className="text-center my-2">
                    <p>
                        <Link className="text-white text-decoration-underline" to="/forgetPassword">
                            Forget Password
                        </Link>
                    </p>
                    <span className="text-dark">Create an Account? </span>
                    <Link className="text-decoration-underline" to="/signup">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
