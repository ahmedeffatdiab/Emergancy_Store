import Joi from 'joi'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
export default function ForgetPassword() {
    let navigate=useNavigate()
    let [User,setUser]=useState({
        UserName:'',
        Email:'',
        Password:'',
        Con_Password:''
    })
    const [userError,serUserError]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    // Updates user state on input
    const getUserData=(e)=>{
        let UserData={...User};
        UserData[e.target.name]=e.target.value;
        setUser(UserData)
    }
    //Validates user registration form data
    const validationForm=()=>{
        let Schema=Joi.object({
            UserName:Joi.string().min(6).max(15).required(),
            Email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).pattern(new RegExp('^[a-zA-Z0-9._%+-]+@gmail\.com$')),
            Password:Joi.string().min(8).max(15).required(),
            Con_Password:Joi.string().min(8).max(15).required()
        })
        return Schema.validate(User,{abortEarly: false})
    }
    //Handles form submission with validation
    const submitData=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        let validationResult=validationForm();
        if(validationResult.error){
            serUserError(validationResult.error.details)
            setIsLoading(false)
        }else{
            navigate('/login')
        }
    }
  return (
    <div>
    <div className='container'>
    <div className='w-100 my-2'>
        <div className='w-md-50 w-sm-100 m-auto py-2 px-3 my-4 SignUp text-white '>
            <div className='w-100 m-auto text-center'>
                <h2>forget Password</h2>
            </div>
            {userError.length>1?
                userError.map((ele,index)=>{
                    return <div className='alert alert-danger'>{ele.message}</div>
                })
            :null}
            <form method='post' onSubmit={submitData} action=''>
                <label htmlFor='Email'>Email</label>
                <input type='text' onChange={getUserData} className='rounded-3 ps-2 my-1' name='Email' placeholder="Enter Email .. "/>
                <button type='submit' className='btn btn-info my-2'>{isLoading?<i className='fas fa-spinner fa-spin fa-2x'></i>:"Send"}</button>
            </form>
        </div>
        
    </div>
    
</div>
</div>
  )
}
