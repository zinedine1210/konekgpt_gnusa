import { MyContext } from "@/context/MyProvider";
import Layout from "../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useState } from "react";
import {FaUser} from "react-icons/fa"
import DonatChart from "@/components/Dashboard/DonatChart";
import BasicBar from "@/components/Dashboard/BasicBar";
import StackedADP from "@/components/Dashboard/StackedADP";
import { BsGlobe } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";


export default function Dashboard() {
  const {t} = useTranslation("common")
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 dark:bg-dark relative flex">
          <div className="w-full relative pt-16 px-2">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
              <div
                className="bg-no-repeat relative bg-cover bg-center p-4 rounded-md shadow-md h-full"
                style={{
                  backgroundImage: `url(/images/widget-bg-1.png)`,
                }}
              >
                <div className="max-w-[169px]">
                  <div className="text-xl font-medium text-slate-900 mb-2">
                    Upgrade your KonekGpt
                  </div>
                  <p className="text-sm text-slate-800">Pro plan for better results</p>
                </div>
                <div className="absolute top-1/2 right-5 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center">
                  Now
                </div>
              </div>
              <div className="flex items-center justify-between bg-white px-5 rounded-md shadow-md h-full">
                <div>
                  <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">New Clients</h1>
                  <p className="font-bold text-black dark:text-white text-4xl">+3.500 <span className="text-lime-500 font-bold text-xl">+2%</span></p>
                </div>
                <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
                  <BsGlobe className="text-white text-3xl"/>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-5 rounded-md shadow-md h-full">
                <div>
                  <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">{"Today's Users"}</h1>
                  <p className="font-bold text-black dark:text-white text-4xl">+300 <span className="text-lime-500 font-bold text-xl">+20%</span></p>
                </div>
                <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
                  <FaUser className="text-white text-3xl"/>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-5 rounded-md shadow-md h-full">
                <div>
                  <h1 className="text-zinc-500 dark:text-zinc-300 font-bold text-xl mb-2">Inbox</h1>
                  <p className="font-bold text-black dark:text-white text-4xl">30 <span className="text-red-500 font-bold text-xl">-2%</span></p>
                </div>
                <div className="bg-gradient-to-tr from-purple-700 to-red-600 flex items-center justify-center w-14 h-14 rounded-xl">
                  <IoNotifications className="text-white text-3xl"/>
                </div>
              </div>
            </div>

            <div className="xl:flex gap-5 mt-5">
              <div className="w-full xl:w-2/5 space-y-5">
                <DonatChart judul={"Chart"}/>
                <BasicBar />
              </div>
              <StackedADP judul="Chart"/>
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