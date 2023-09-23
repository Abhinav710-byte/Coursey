import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { verify_author } from '@/utils/servercalls/auth'
import Image from 'next/image'
import { FileUploader } from "react-drag-drop-files";
import { upload_video } from '@/utils/cloudinary/video_upload'
import { add_chapter } from '@/utils/servercalls/course'
import ChaptersCatalog from '@/components/ChaptersCatalog'
function AddChapter({setLoading}) {

  const router = useRouter()
  const id = router.query.course_id
  const [cookies, setCookies] = useCookies(['auth-token'])
  const [course, setCourse] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [chapters, setChapters] = useState([])

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  }
  useEffect(() => {
    if (!cookies['auth-token']) {

      router.push('/auth/login')

    } else {
      if (id) {
        console.log({ id });
        verify_author(id, cookies['auth-token']).then((res) => {
          console.log({ res });
          setCourse(res?.course)
          setChapters(res?.chapters)

        }).catch((e) => {
          router.push('/')
        })

      }

    }

  }, [id])


  const handleAddChapter = (event) => {
    setIsLoading(true)

    if (!cookies['auth-token']) {
      setIsLoading(false)
      return;
    }

    setLoading(true)



    event.preventDefault();
    const data = new FormData(event.target);
    console.log(file);

    upload_video(file).then((res) => {
      console.log(res?.url);
      data.set('video', res?.url)
      data?.set('order_no', chapters.length +1)
      add_chapter(id, data, cookies['auth-token']).then((res) => {

        console.log({ res });

        // router.push(`/add_chapter/${res?.id}`)
        setChapters([...chapters, res])



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
    <div className='px-12 text-white'>

      <div className='flex justify-start items-start py-8'>

        <div className=''>

          <div className='w-[20rem] h-[20rem] relative'>
            <Image src={course?.thumbnail} fill />

          </div>

        </div>

        <div>

          <div className='ml-8'>
            <h1 className='text-6xl'>{course?.name}</h1>

            <p className='text-sm opacity-60 mt-6'>{course?.description}</p>

          </div>

        </div>

      </div>

      <div className=''>
        {chapters.length !== 0 &&(

        <ChaptersCatalog chapters={chapters? chapters :[]}  />
        )}


      </div>



      <div className=''>
        <div className='my-6'>

          <h1 className='text-4xl'>Add chapters</h1>

        </div>



        <form onSubmit={handleAddChapter}>

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
                <h1 className='text-xl font-medium'>Video</h1>
                <p className='text-sm mt-2'>Upload your video here</p>

              </div>

              <div className='w-full'>

                <FileUploader handleChange={handleChange} name="thumbnail" classes="!w-full !border-gray-400 !max-w-full !max-h-60 !p-12" required={true} />

              </div>

            </div>

          </div>

          <div className='flex justify-end py-8'>

            <button disabled={false} type='submit' className='text-white bg-green-accent py-3  px-4 w-[30rem] rounded-xl font-medium text-xl flex justify-center items-center'>
              <h1 className='mr-4'>Proceed</h1>
              {/* <BsArrowRight /> */}
            </button>



          </div>

        </form>

      </div>

    </div>
  )
}

export default AddChapter