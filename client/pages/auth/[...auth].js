import { login, register } from '@/utils/servercalls/auth';
import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useCookies } from 'react-cookie';
function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [cookies, setCookie] = useCookies(['auth-token']);
    const [ username, setUsername] = useCookies(['username'])

    const [isLoading, setLoading] = useState(false)
    var cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate()+60);

    const handleLogin = (e) =>{
        e.preventDefault()
        setLoading(true)
        const data = new FormData(event.target);
        login(data).then((res)=>{
           
            setCookie('auth-token', res?.token)
            setUsername('username', data.get('username'), {expires: cookieExpiry, path:'/'})
            toast.success("Logged In successfully !!")
            setLoading(false)
        }).catch(e=>{
            console.log(e);
            if(e?.response?.data?.non_field_errors){
                toast.error("Wrong Credentials !!")
            }else
                toast.error("Something went wrong  !!")
            setLoading(false)

        })
        

    }

    const handleRegister = (event) =>{
        // e.preventDefault();
        setLoading(true)
        event.preventDefault();
        const data = new FormData(event.target);
    

      
        if(data.get('password') != data.get('confirm_password')){
            toast.error("Passwords do not match!!")
            setLoading(false)
            return ;
        }
        
        
        register(data).then((res)=>{
          
            setCookie('auth-token', res?.token)
            setUsername('username', data.get('username'), {expires: cookieExpiry, path:'/'})
            toast.success("Registered In successfully !!")
            setLoading(false)
        }).catch(e=>{
            if(e?.response?.data?.username){
                toast.error(e?.response?.data?.username[0])
            }else{
                toast.error("Something went wrong!!")
            }

            setLoading(false)
            

        })
    }

    return (


        <div className='text-white flex justify-center items-center w-full py-8 h-screen'>
            <div className='w-1/2 bg-more-elevated-dark-bg rounded-lg p-8 shadow-md'>

                <div className='flex justify-between items-start w-full'>
                    <button onClick={() => setIsLogin(true)} className={isLogin ? 'bg-dark-bg p-4 w-1/2 text-center rounded-l-md' : 'bg-elevated-dark-bg p-4 w-1/2 text-center rounded-l-md'}>
                        <h1>
                            Login
                        </h1>

                    </button>

                    <button onClick={() => setIsLogin(false)} className={!isLogin ? 'bg-dark-bg p-4 w-1/2 text-center rounded-r-md' : 'bg-elevated-dark-bg p-4 w-1/2 text-center rounded-r-md'}>
                        <h1>
                            Signup
                        </h1>

                    </button>

                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className='' id="login">


                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Username</h1>
                            <input name='username' className='bg-dark-bg rounded-md w-full text-white p-4' id="username"  required/>

                        </div>


                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Password</h1>
                            <input type='password' name='password'  className='bg-dark-bg rounded-md w-full text-white p-4' id="password" required/>

                        </div>


                        <button type='submit' className='w-full p-4 rounded-md bg-blue-500 mt-8'>
                            Login
                        </button>


                    </form>

                ) : (
                    <form onSubmit={handleRegister} className='' id="signup">

                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Name</h1>
                            <input className='bg-dark-bg rounded-md w-full text-white p-4' name='first_name'  required/>

                        </div>
                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Username</h1>
                            <input className='bg-dark-bg rounded-md w-full text-white p-4' name='username'  required/>

                        </div>
                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Email</h1>
                            <input type='email' className='bg-dark-bg rounded-md w-full text-white p-4' name='email'  required/>

                        </div>

                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Password</h1>
                            <input  type='password' className='bg-dark-bg rounded-md w-full text-white p-4' name='password'   required/>

                        </div>
                        <div className='mt-8'>
                            <h1 className='text-lg mb-2'>Confirm Password</h1>
                            <input type='password' className='bg-dark-bg rounded-md w-full text-white p-4' name='confirm_password'  required/>

                        </div>

                        <button type='submit' className='w-full p-4 rounded-md bg-blue-500 mt-8'>
                            Signup
                        </button>

                    </form>


                )}








            </div>
        </div>
    )
}

export default Auth