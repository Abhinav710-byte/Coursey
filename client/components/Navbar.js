import Link from 'next/link'
import React from 'react'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
function Navbar({}) {
    const [username, setUsername] = useCookies(['username'])
    console.log({username});
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);
  return (
    <div className='flex justify-between px-16 py-6  text-white'>
        <div className='text-xl font-bold flex justify-start items-center'>

            <div className='text-6xl font-bold mr-12'>

                C

            </div>

            <Link href={'/'}>
                <h1 className=' mr-6'>Home</h1>
            </Link>
            <Link href={'/'}>
                <h1 className=' mr-6'>Courses</h1>
            </Link>
            <Link href={'/add_course'}>
                <h1 className=' mr-6'>Add Course</h1>
            </Link>
            

        </div>
        {hasWindow && username['username']  ? (
            <div className='flex font-semibold justify-end items-center'>

                <h1 className='text-xl'>{username['username']}</h1>
            </div>
        ):(

            <div className='flex font-semibold justify-end items-center'>



            <Link href={'/'}>

                <h1 className='text-xl opacity-70 '>Login</h1>

            </Link>
            
            <button className='bg-blue-600 text-white text-md mx-6 rounded-md p-3 px-8 '>
                Signup
            </button>

        </div>

        )}
        

    </div>
  )
}

export default Navbar