import Layout from "../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useEffect, useState } from "react";
import {FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"


export default function Inbox() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen flex">
          <div className="w-1/5 bg-white pt-16">
            <label class="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">INBOX</label>

            <div className="space-y-2 mt-2">
              <div className="hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">Z</span>
                <div className="">
                  <h1 className="text-[15px] font-bold">Zinedine Ziddan..</h1>
                  <p className="text-xs text-zinc-500">Hallo ges</p>
                </div>
                <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
                <span className="rounded-full bg-blue-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">3</span>
                <FaTelegramPlane className="text-blue-500 absolute bottom-2 right-10" />
              </div>
              <div className="hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">C</span>
                <div className="">
                  <h1 className="text-[15px] font-bold">Charly Samosi..</h1>
                  <p className="text-xs text-zinc-500">Tolong berikan saya kode http..</p>
                </div>
                <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
                <span className="rounded-full bg-red-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">6</span>
                <FaInstagram className="text-red-500 absolute bottom-2 right-10" />
              </div>
              <div className="hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">D</span>
                <div className="">
                  <h1 className="text-[15px] font-bold">Denis Muhamma..</h1>
                  <p className="text-xs text-zinc-500">Hallo, thank you for using chatb..</p>
                </div>
                <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
                <span className="rounded-full bg-green-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">8</span>
                <FaWhatsapp className="text-green-500 absolute bottom-2 right-10" />
              </div>
              <div className="hover:bg-zinc-100 transition-all duration-300 border-b p-2 flex gap-2 cursor-pointer relative">
                <span className="bg-zinc-200 w-8 h-8 rounded-full flex items-center justify-center">M</span>
                <div className="">
                  <h1 className="text-[15px] font-bold">Maruba Simangu..</h1>
                  <p className="text-xs text-zinc-500">Hallo, thank you for using chatb..</p>
                </div>
                <p className="text-[10px] absolute top-2 right-2">Today at 17.55</p>
                <span className="rounded-full bg-sky-500 w-5 text-sm font-bold flex items-center justify-center h-5 absolute bottom-2 right-2 text-white ">11</span>
                <FaTwitter className="text-sky-500 absolute bottom-2 right-10" />
              </div>
            </div>
          </div>
          <div className="w-4/5 bg-zinc-100 relative h-screen pt-16 pb-24">
            <div className="h-full overflow-y-auto">
              <div className="space-y-2 w-2/3 mx-auto">
                <div className="flex gap-2">
                  <div className="ml-auto">
                    <h1 className="text-end text-zinc-500 text-sm py-1">You</h1>
                    <div className="space-y-2">
                      <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl ml-auto relative">
                        <h1 className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing Coba.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl ml-auto relative">
                        <h1 className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe libero amet ipsum magni ullam? In odit voluptatibus vero nobis.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Y</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                  <div>
                    <h1 className="text-zinc-500 text-sm py-1">Zinedine Ziddan...</h1>
                    <div className="space-y-2">
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                      <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-xl relative">
                        <h1 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta asasa</h1>
                        <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="absolute right-1/2 translate-x-1/2 w-2/3 bottom-5 overflow-hidden rounded-xl">
              <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                <input id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-sm border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={50} onChange={(e) => handlerChange(e.target.value)} />
                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                  <HiOutlineArrowSmRight className="text-xl"/>
                </button>
              </form>
              <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/50</h1>
            </div>
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}



export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    }
  };
}