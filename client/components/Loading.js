import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
function Loading() {
  return (
    <div className='absolute inset-0 w-full h-screen flex justify-center items-center z-10 bg-black bg-opacity-25' >

        <div className='text-white text-6xl animate-spin'>
            <AiOutlineLoading3Quarters/>
        </div>

    </div>
  )
}

export default Loading