import React from 'react'
import CourseCard from './CourseCard'

function CoursesCatalog({data}) {
  return (
    <div className='grid grid-cols-4 gap-4 w-full px-12 my-12 text-white'>

       
        {
          data?.map((item) =>{
            return (
              <CourseCard course={item}/>
            )
          })
        }


    </div>
  )
}

export default CoursesCatalog