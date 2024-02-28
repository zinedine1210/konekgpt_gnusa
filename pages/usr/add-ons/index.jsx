import SelectBot from "@/components/Knowledge/SelectBot";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/MyProvider";
import TableUsageReport from "@/components/UsageReport/TableUsageReport";
import { BsChevronDoubleRight, BsEnvelope, BsFillCalendarEventFill } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";


export default function AddOns() {
  const {t} = useTranslation("common")
  const context = useContext(MyContext)

  useEffect(() => {
    if(!context.structured){
      const getData = JSON.parse(localStorage.getItem("structuredData"))
      if(getData){
        context.setData({...context, structured:getData})
      }else{
        getDataStructured()
      }
    }
  }, [])

  const getDataStructured = async () => {
    const result = await axios.get("/structure2.json")
    console.log(result);
    localStorage.setItem("structuredData", JSON.stringify(result.data))
    context.setData({...context, structured:result.data})
  }


  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
            <div className="px-3 xl:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 xl:p-5">
                  <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Add Ons</label>
                  <p className="text-sm text-zinc-500 font-light">Your AI understands many topics, but you can add specific knowledge about your company or products to supplement it.</p>

                  <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 mt-5">
                    {
                      context.structured?
                      context.structured.services.length?
                      context.structured.services.map((sv, key) => {
                        return (
                          <div key={key} className="bg-white dark:bg-darkPrimary shadow-md rounded-md p-5">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-500">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                  </svg>
                              </div>
                              <h1 className="mt-2 font-bold text-zinc-500">{sv.code}</h1>
                              <Link href={`/usr/add-ons/${sv.properties[0]?.params}?m=clm_addons&svid=${sv.id}`}>
                                <button className="text-blue-500 flex items-center text-sm mt-2 hover:text-blue-700">Lihat Selengkapnya <BsChevronDoubleRight /></button>
                              </Link>
                          </div>
                        )
                      })
                      :
                      <h1 className="uppercase text-red-500 text-xl">Not Available Event Added</h1>
                      :
                      new Array(10).fill("loading").map((key) => {
                        return (
                          <div className="bg-zinc-200 animate-pulse w-full rounded-md shadow-md h-32">
    
                          </div>
                        )
                      })
                    }
                    {/* <div className="bg-white shadow-md rounded-md p-5">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                            <BsFillCalendarEventFill className="text-blue-500" />
                        </div>
                        <h1 className="mt-2 font-bold text-zinc-500">Registrasi Event</h1>
                        <button className="text-blue-500 flex items-center text-sm mt-2 hover:text-blue-700">Lihat Selengkapnya <BsChevronDoubleRight /></button>
                    </div>
                    <div className="bg-white shadow-md rounded-md p-5">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                            <BsEnvelope className="text-blue-500"/>
                        </div>
                        <h1 className="mt-2 font-bold text-zinc-500">Registrasi Appointment</h1>
                        <button className="text-blue-500 flex items-center text-sm mt-2 hover:text-blue-700">Lihat Selengkapnya <BsChevronDoubleRight /></button>
                    </div> */}
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
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}