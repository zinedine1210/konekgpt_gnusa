import SelectBot from "@/components/Knowledge/SelectBot";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useEffect, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import {FaChevronDown, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"
import CardKnowledge from "@/components/Knowledge/CardKnowledge";
import SelectType from "@/components/Knowledge/SelectType";


export default function Knowledge() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen">
            <div className="px-5 pt-16 h-full overflow-y-auto">
                <div className="p-5">
                  <label class="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Knowledge Base</label>
                  <p className="text-sm text-zinc-500 font-light">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

                  <div className="flex gap-5">
                    <div className="my-5 w-full md:w-3/4">
                      <h1 className="text-sm font-bold text-zinc-600 mb-3">All Stories Your Bot</h1>
                      <div className="flex items-center justify-between">
                        <input type="search" className="input-search" placeholder="Search" />

                        <div className="flex items-center gap-2">
                          <SelectBot />
                          <SelectType />
                        </div>
                      </div>
                      <div className="mt-5">
                        <table class="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead class="">
                                <tr>
                                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        <div class="flex items-center gap-x-3">
                                            {/* <input type="checkbox" class="text-blue-500 border-zinc-300 rounded dark:bg-zinc-900 dark:ring-offset-zinc-900 dark:border-zinc-700"/> */}
                                            <span>User Query</span>
                                        </div>
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Status
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Created At
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                                        Type
                                    </th>

                                    <th scope="col" class="relative py-3.5 px-4">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-zinc-200 dark:divide-zinc-700 dark:bg-zinc-900">
                              {
                                new Array(10).fill("coba").map((item, key) => {
                                  return <CardKnowledge key={key}/>
                                })
                              }
                              
                            </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="w-[400px] h-[840px] border-8 border-black rounded-[50px] bg-white dark:bg-dark dark:border-black px-2 mx-auto outline outline-blue-300 shadow-2xl pb-16 pt-5 relative">
                      <div className="h-full overflow-y-hidden hover:overflow-y-auto">
                        <div className="space-y-2 w-full mx-auto">
                          <div className="flex gap-2">
                            <div className="ml-auto">
                              <h1 className="text-end text-zinc-500 text-xs py-1">You</h1>
                              <div className="space-y-2">
                                <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] ml-auto relative">
                                  <h1 className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing Coba.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] ml-auto relative">
                                  <h1 className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe libero amet ipsum magni ullam? In odit voluptatibus vero nobis.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Y</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                            <div>
                              <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                              <div className="space-y-2">
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                            <div>
                              <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                              <div className="space-y-2">
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                            <div>
                              <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                              <div className="space-y-2">
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                            <div>
                              <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                              <div className="space-y-2">
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                            <div>
                              <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                              <div className="space-y-2">
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                                <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                                  <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute right-1/2 translate-x-1/2 w-full px-5 bottom-0 overflow-hidden rounded-xl">
                        <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                          <input id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-xs border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={50} onChange={(e) => handlerChange(e.target.value)} />
                          <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                            <HiOutlineArrowSmRight className="text-xl"/>
                          </button>
                        </form>
                        <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/50</h1>
                      </div>
                    </div>
                  </div>
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