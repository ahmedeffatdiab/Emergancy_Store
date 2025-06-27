import React, { useState } from 'react'
import HeaderLinks from '../HeaderLinks/HeaderLinks'
import Footer from '../Footer/Footer'
import Joi from 'joi'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function SignUp() {
    let navigate=useNavigate()
    let [User,setUser]=useState({
        username:'',
        email:'',
        password:'',
        con_password:''
    })
    const [userError,serUserError]=useState([])
    const [serverValidation,serServerValidation]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    // Update user data from input
    const getUserData=(e)=>{
        let UserData={...User};
        UserData[e.target.name]=e.target.value;
        setUser(UserData)
    }
    // Validate registration form user input
    const validationForm=()=>{
        let Schema=Joi.object({
            username:Joi.string().min(4).max(15).required(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).pattern(new RegExp('^[a-zA-Z0-9._%+-]+@gmail\.com$')),
            password:Joi.string().min(6).max(15).required(),
            con_password:Joi.string().min(6).max(15).required().messages({
                    'string.min': 'confirm Password must be at least 6 characters long',
                    'string.max': 'confirm Password must be at most 15 characters long',
                    'any.required': 'confirm Password is required',
                }),
        })
        return Schema.validate(User,{abortEarly: false})
    }
    // Send signup data to server
    async function sendDataToServer(){
        let res=await axios.post('https://emergancy-api-kqk9.vercel.app/auth/SignUp',User,{
            headers : {
            'Content-Type': 'application/json',
            }
        })
        console.log(res);
        if(res.data.message==="success"){
            navigate('/login')
        }else{
            setIsLoading(false)
            serServerValidation(res.data.message)
        }
    }
    // Validate form and submit data
    const submitData=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        let validationResult=validationForm();
        if(validationResult.error){
            serUserError(validationResult.error.details)
            console.log(validationResult);
            setIsLoading(false)
        }else{
            sendDataToServer()
        }
    }
return (
    <div>
        <div className='container'>
            <div className='w-100 my-2'>
                <div className='w-50  m-auto py-2 px-3 my-4 SignUp text-white '>
                    <div className='w-100 m-auto text-center'>
                        <h2>SignUp</h2>
                    </div>
                    {serverValidation.length>1?
                        <div className='alert alert-danger'>{serverValidation}</div>
                    :null}
                    <form method='post' onSubmit={submitData} action=''>
                        <label htmlFor='username'>username</label>
                        <input onChange={getUserData} type='text' className='rounded-3 ps-2 my-1' name='username' placeholder="Enter Username .. "/>
                        {userError.find(err => err.context.key === 'username') && (
                            <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                                {userError.find(err => err.context.key === 'username').message}
                            </div>
                        )}
                        <label htmlFor='email'>email</label>
                        <input onChange={getUserData} type='text' className='rounded-3 ps-2 my-1' name='email' placeholder="Enter Email .. "/>
                        {userError.find(err => err.context.key === 'email') && (
                            <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                                {userError.find(err => err.context.key === 'email').message}
                            </div>
                        )}
                        <label htmlFor='password'>password</label>
                        <input onChange={getUserData} type='password' className='rounded-3 ps-2 my-1' name='password' placeholder="Enter Password .. "/>
                        {userError.find(err => err.context.key === 'password') && (
                            <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                                {userError.find(err => err.context.key === 'password').message}
                            </div>
                        )}
                        <label htmlFor='con-password'>confirm_Password</label>
                        <input onChange={getUserData} type='password' className='rounded-3 ps-2 my-1' name='con_password' placeholder="Confirm Password .. "/>
                        {userError.find(err => err.context.key === 'con_password') && (
                            <div className=" py-1" style={{fontSize:"14px",color:"yellow",fontWeight:"bold"}}>
                                {userError.find(err => err.context.key === 'con_password').message}
                            </div>
                        )}
                        <button type='submit' className='btn btn-info my-2'>{isLoading?<i className='fas fa-spinner fa-spin fa-2x'></i>:"SignUp"}</button>
                    </form>
                    <div className='w-100 text-center my-1'>
                                <span className='d-inline text-dark '>You Have an Account ? </span>
                                <Link className='d-inline text-decoration-underline ' to='/login'>Login</Link>
                    </div>
                </div>
                
            </div>
            
        </div>
    <Footer/>
    </div>

)
}
