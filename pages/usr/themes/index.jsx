import Layout from '@/components/Layouts/Layout'
import { useTheme } from 'next-themes'
import React from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

export default function ThemesSettings() {
  const {theme, setTheme} = useTheme("light")

  return (
    <Layout title={"Themes Setting Website"} desc={"Halaman pengaturan website tema"}>
        <section className='pt-16 bg-zinc-100 dark:bg-dark h-full'>
          <div className='p-10'>
            <h1 className='font-bold text-xl'>Themes Customizer</h1>
            <p className='text-zinc-600 dark:text-zinc-300'>Customize & Preview in Real Time</p>


            <div className='mt-5 p-5'>
              <div className='w-full xl:w-1/4'>
                <h1 className='font-bold mb-2'>Themes</h1>
                <div className='flex items-center gap-5'>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input checked={theme == "light"} id="dark" type="radio" onChange={() => setTheme("light")} name="themesmode" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="dark" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">Light <BsSunFill className='text-yellow-500 text-xl'/></label>
                  </div>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input checked={theme == "dark"} id="light" type="radio" onChange={() => setTheme("dark")} name="themesmode" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="light" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">Dark <BsMoonFill className='text-blue-900 text-xl'/></label>
                  </div>
                </div>
              </div>
              <div className='w-full xl:w-1/4 mt-5'>
                <h1 className='font-bold mb-2'>Language</h1>
                <div className='flex items-center gap-5'>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input id="dark" type="radio" value="" name="language" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="dark" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">Indonesia</label>
                  </div>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input checked id="light" type="radio" value="" name="language" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="light" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">English</label>
                  </div>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input checked id="light" type="radio" value="" name="language" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="light" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">Bangladesh</label>
                  </div>
                  <div class="w-full flex items-center px-4 bg-white dark:bg-darkPrimary border border-gray-200 rounded-md dark:border-gray-700">
                      <input checked id="light" type="radio" value="" name="language" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label for="light" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center justify-between gap-2">India</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
}
