import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
// import '@/styles/loading.css'
// import '@/styles/loading2.css'
// import '@/styles/loading3.css'

// import "../build.css"
import {appWithTranslation} from "next-i18next"
import { useEffect, useState } from 'react'
import { MyProvider } from '@/context/MyProvider'
import WithAuth from '@/components/WithAuth'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"


function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [routeNow, setRouteNow] = useState("");
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {

      console.log(`Loading: ${url}`);
      setRouteNow(router.asPath)
      
      if (url !== router.asPath) {
        setIsPageChanging(true);
      }

      nProgress.configure({ easing: 'ease', speed:500, showSpinner:true });
      nProgress.start()
    }

    const handleStop = () => {
      nProgress.done()
      setIsPageChanging(false);
    }
    
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <ThemeProvider defaultTheme='light' enableSystem={false} attribute="class">
        <MyProvider>
          <Component {...pageProps} />
        </MyProvider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)