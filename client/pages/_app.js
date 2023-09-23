import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider, useCookies } from 'react-cookie';
import { use, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';

export default function App({ Component, pageProps }) {

  const [cookies, setCookie] = useCookies(['auth-token']);
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    if(cookies['auth-token']){

    

    }
  },[])
  return (
    <CookiesProvider>

      <div className='bg-dark-bg relative'>

        {loading && (
          <Loading/>
        )}
        <ToastContainer />
        <Navbar  />

        <Component {...pageProps} loading={loading} setLoading={setLoading}/>

      </div>
    </CookiesProvider>
  )
}
