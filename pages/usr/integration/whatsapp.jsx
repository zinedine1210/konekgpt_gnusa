import Layout from "../../../components/Layouts/Layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useState } from "react";
import {FaChevronRight} from "react-icons/fa"
import WhatsappList from "@/components/Integration/Whatsapp/WhatsappList";


export default function WhatsappOfficial() {
  
  return (
    <Layout title="Whatsapp Integration" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <div className="w-full bg-white dark:bg-dark h-screen pt-16 overflow-y-auto">
          <div className="flex items-center gap-2 pt-1 pb-3 px-3">
            <h1 className="text-xs text-zinc-500 uppercase dark:text-zinc-400">Integration</h1>
            <FaChevronRight className="text-zinc-500 text-xs"/>
            <h1 className="text-xs font-bold uppercase">Whatsapp</h1>
          </div>
          <WhatsappList />
        </div>
      </Suspense>
    </Layout>
  )
}



export async function getServerSideProps({ locale, query }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}