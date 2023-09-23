import React from 'react'

function ChaptersCatalog({chapters}) {
    console.log({chapters});
  return (
    <div className='w-full overflow-x-auto py-6  flex justify-normal '>

        {chapters && chapters?.map((item)=>{
            return (
                <div className='h-full mx-4 w-[20rem] bg-elevated-dark-bg rounded-xl shadow-md p-4'>
                    <h1><span className='text-6xl text-indigo-400'>{item?.order_no}</span></h1>
                    <h1 className='text-lg'>
                    {item.name}

                    </h1>


                </div>
            )
        })}

    </div>
  )
}

export default ChaptersCatalog