import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function CourseCard({course}) {
  return (
    <Link href={`/course/${course?.id}`}>
     <div className='rounded-md bg-elevated-dark-bg shadow-md'>

<div className='relative h-40  rounded-lg'>
  <Image src={course?.thumbnail} fill />
</div>

<div className='p-4'>

    <h1 className='text-xl '>{course?.name}</h1>

    <p className='text-sm opacity-50 mt-4'>{course?.description}</p>

</div>

</div>
    </Link>
   
  )
}

export default CourseCard