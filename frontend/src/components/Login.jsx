import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import {useForm} from "react-hook-form" 
import {useAuth} from '../context/AuthContext';

//npm isntall react hook form- gives the sample data you entered in an object format

const Login = () => {
    const [message, setMessage] = useState("") //by default empty
    const { loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()
    const {               //take from react hook form website
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {   //take from react hook form website
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
      }

      const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
      }
  return (
    //calc-100vh(full screen size), subtract 120 px from it 
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

             <form  onSubmit={handleSubmit(onSubmit)} > 
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })}  //take from react hook form website , by default it will be required
                    type="email" name="email" id="email" placeholder='Email Address'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'  //on focus-no outline+ shadow present
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })} 
                    type="password" name="password" id="password" placeholder='Password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>  //if u enter invalid details
                }
                <div>
                    <button className='bg-pink-500 hover:bg-pink-950 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
                </div>
            </form>
            {/* when u enter the email n pwd an object will be submited or returned with all these details */}
            <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-pink-500 hover:text-pink-700'>Register</Link></p>

            {/* google sign in */}
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-pink-950 hover:bg-pink-950 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle  className='mr-2'/>
                Sign in with Google
                </button>
            </div>

            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 MyBookStore. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Login