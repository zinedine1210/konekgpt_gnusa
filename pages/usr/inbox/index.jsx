import { MyContext } from "@/context/MyProvider";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useState } from "react";
import {HiOutlineArrowSmRight} from "react-icons/hi"
import ChatList from "@/components/Inbox/ChatList";
import DetailChat from "@/components/Inbox/DetailChat";


export default function Inbox() {
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)
  const context = useContext(MyContext)

  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden md:block"} md:z-0 md:relative md:w-1/4 bg-white pt-16 mt-1`}>
          
            <ChatList />
          </div>
          <DetailChat />
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