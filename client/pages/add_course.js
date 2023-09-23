import UploadForm from '@/components/CreateCourse';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs'
import { add_course } from '@/utils/servercalls/course';
import { upload_image } from '@/utils/cloudinary/image_upload';
function AddCourse({loading, setLoading}) {
    const router = useRouter()
    console.log({loading});
    const [cookies, setCookie] = useCookies(['auth-token']);
    const [isLoading, setIsLoading] = useState(false)

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    }

    useEffect(() => {
        if (!cookies['auth-token']) {

            router.push('/auth/login')
        }
    }, [])

    const handleCreateCourse = (event) => {
        setIsLoading(true)
        setLoading(true)

        if (!cookies['auth-token']) {
            setIsLoading(false)
            setLoading(false)
            return;
        }



        event.preventDefault();
        const data = new FormData(event.target);
        console.log(file);

        upload_image(file).then((res) => {
            console.log(res?.url);
            data.set('thumbnail', res?.url)
            add_course(data, cookies['auth-token']).then((res) => {

                console.log({ res });
                setLoading(false)
                router.push(`/add_chapter/${res?.id}`)

                

            }).catch(e => {
                console.log(e);
            })
            setIsLoading(false)
            setLoading(false)


        }).catch((e) => {
            console.log(e);
        })
        setIsLoading(false)
        setLoading(false)

        return




    }

    return (
        <div className='md:px-20 text-white'>


            <div className='flex justify-start items-center py-12 mb-12'>

                <div className=' rounded-3xl w-40 h-40 flex justify-center items-center bg-green-accent text-black text-center p-4'>

                    <h1 className='text-8xl font-black'>
                        C
                    </h1>


                </div>

                <div className='mx-8'>
                    <h1 className='text-4xl font-medium'>Make your course here</h1>
                    <h1 className='text-sm mt-4'>Author Name</h1>
                </div>

            </div>

            <h1 className='text-2xl font-medium'>Course Overview</h1>
            <p className='text-lg mt-2'>Set your course overview here</p>

            <form onSubmit={handleCreateCourse}>

                <div className='border-t border-gray-600 py-12 mt-6'>

                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <div className=''>
                            <h1 className='text-2xl font-medium'>Title</h1>
                            <p className='text-sm mt-2'>Give your course a apt title</p>

                        </div>

                        <div className=''>

                            <input className='border-gray-400 border-[1.5px] p-3 bg-dark-bg rounded-lg w-full' name='name' required />

                        </div>

                    </div>

                </div>
                <div className='border-t border-gray-600 py-12 mt-6'>

                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <div className=''>
                            <h1 className='text-2xl font-medium'>Description</h1>
                            <p className='text-sm mt-2'>Describe your course in few words</p>

                        </div>

                        <div className=''>

                            <textarea rows={10} name='description' className='border-gray-400 border-[1.5px] p-2 bg-dark-bg rounded-lg w-full' required>

                            </textarea>

                        </div>

                    </div>

                </div>

                <div className='border-t border-gray-600 py-12 mt-6'>

                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <div className=''>
                            <h1 className='text-xl font-medium'>Thumbnail</h1>
                            <p className='text-sm mt-2'>Upload your thumbnail here</p>

                        </div>

                        <div className='w-full'>

                            <FileUploader handleChange={handleChange} name="thumbnail" classes="!w-full !border-gray-400 !max-w-full !max-h-60 !p-12" required={true} />

                        </div>

                    </div>

                </div>

                <div className='flex justify-end py-8'>

                    <button disabled={isLoading} type='submit' className='text-white bg-green-accent py-3  px-4 w-[30rem] rounded-xl font-medium text-xl flex justify-center items-center'>
                        <h1 className='mr-4'>Proceed</h1>
                        <BsArrowRight />
                    </button>



                </div>

            </form>


            {/* <UploadForm/> */}
        </div>
    )
}

export default AddCourse