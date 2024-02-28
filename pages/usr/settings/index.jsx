import { MyContext } from "@/context/MyProvider";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import {FaChevronLeft, FaInstagram, FaTelegramPlane, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {HiOutlineArrowSmRight} from "react-icons/hi"


export default function Settings() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)
  const context = useContext(MyContext)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="SETTINGS" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden xl:block"} xl:z-0 xl:relative xl:w-1/5 bg-white pt-16 mt-1`}>
            <label className="block text-sm px-3 xl:text-xs text-zinc-500 uppercase dark:text-zinc-400">SETTINGS</label>

            <div className="space-y-2 mt-5 xl:mt-2">
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>User Management</h1>
              </button>
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>Agent Management</h1>
              </button>
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>Inbox</h1>
              </button>
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>Contact Info</h1>
              </button>
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>Score</h1>
              </button>
              <button onClick={() => context.setData({...context, view:3})} className="w-full hover:bg-zinc-100 transition-all duration-300 py-2 px-3 flex gap-2 cursor-pointer relative items-center">
                <h1>Ticket</h1>
              </button>
            </div>
          </div>

          <div className={`w-full xl:w-4/5 bg-zinc-100 relative h-screen pt-16 pb-20 xl:pb-24`}>
            
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