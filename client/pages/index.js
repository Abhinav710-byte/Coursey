import Image from 'next/image'
import { Inter } from 'next/font/google'
import Hero from '@/components/Hero'
import CoursesCatalog from '@/components/CoursesCatalog'
import { get_course } from '@/utils/servercalls/course'

const inter = Inter({ subsets: ['latin'] })

export default function Home({res}) {
  return (
    <div className='px-12'>


    <div className='flex justify-center '>
      <div className='md:w-3/4 mt-28 mb-4 text-white'>

      <Hero/>

      </div>
    </div>



    <div className='flex justify-center py-[20vh]'>
      <CoursesCatalog data={res}/>

    </div>
    </div>
  )
}


export const getServerSideProps = async () =>{
  let res =await get_course('')
  return {
    props:{
      res
    }
  }
  
}