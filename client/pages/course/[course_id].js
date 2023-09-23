import React, { use } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { get_course } from '@/utils/servercalls/course'
import { redirect } from 'next/dist/server/api-utils'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'
function Course({ data }) {
    console.log(data?.chapters);
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const [chapters, setChapters] = useState(data?.chapters)

    const [selectedChapter, setSelectedChapter] = useState(data?.chapters ? 1: -1)

    return (
        <div className='text-white px-12 min-h-screen'>
            <div className='flex justify-start items-start py-8'>

                <div className=''>

                    <div className='w-[20rem] h-[20rem] relative'>
                        <Image src={data?.course?.thumbnail} fill />

                    </div>

                </div>

                <div>

                    <div className='ml-8'>
                        <h1 className='text-6xl'>{data?.course?.name}</h1>

                        <p className='text-sm opacity-60 mt-6'>{data?.course?.description}</p>

                    </div>

                </div>

            </div>
            <h1 className='text-3xl mt-6'>Chapters</h1>
            <div className='grid grid-cols-3 gap-2 w-full overflow-x-auto py-8'>
                {data?.chapters?.map((item, index) => {
                    return (
                        <div className='rounded-xl bg-elevated-dark-bg p-4 delay-150 ease-in-out cursor-pointer hover:-translate-y-4' onClick={()=>setSelectedChapter(index+1)}>
                            <h1 className='text-indigo-400 text-4xl'>{item.order_no}</h1>

                            <h1 className='text-lg'>
                                {item.name}

                            </h1>

                            {/*  */}
                        </div>)

                })}

            </div>


            <div className=' py-6'>

                {chapters && (
                    <div className='relative my-2'>
                    {hasWindow && (

                        <ReactPlayer width={"100%"} height={"100%"} url={chapters[selectedChapter-1]?.video} controls={true} />
                    )}

                    <div className=' my-6'>
                        <h1 className='text-4xl'>{chapters[selectedChapter-1].name}</h1>
                        <p className='my-4 text-lg'>{chapters[selectedChapter-1].description}</p>
                    </div>

                    </div>

                )}

                        

            </div>

        </div>
    )
}

export default Course


export const getServerSideProps = async ({ req, res, query }) => {

    const course_id = query.course_id
    try {
        const resp = await get_course(course_id);
        const data = resp
        console.log({ data });

        return {
            props: {
                data
            }
        }

    } catch (e) {

        res.writeHead(302, { Location: '/404' })

    }





}