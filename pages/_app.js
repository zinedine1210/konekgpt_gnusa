import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import '@/styles/loading.css'
// import "../build.css"
import {appWithTranslation} from "next-i18next"
import { useEffect, useState } from 'react'
import { MyProvider } from '@/context/MyProvider'
import WithAuth from '@/components/WithAuth'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <>
      {/* <ThemeProvider enableSystem={true} attribute="class"> */}
        <MyProvider>
          <Component {...pageProps} />
        </MyProvider>
      {/* </ThemeProvider> */}
    </>
  )
}

export default appWithTranslation(WithAuth(MyApp))