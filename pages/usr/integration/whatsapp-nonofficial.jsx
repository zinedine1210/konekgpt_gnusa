import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useState } from "react";
import {FaChevronRight, FaPowerOff, FaTelegram, FaTelegramPlane} from "react-icons/fa"
import ChannelType from "@/components/Integration/ChannelType";
import TelegramList from "@/components/Integration/Telegram/TelegramList";
import WhatsappList from "@/components/Integration/Whatsapp/WhatsappList";
import WhatsappNonOfficialList from "@/components/Integration/Whatsapp/WhatsappNonOfficialList";


export default function WhatsappNonOfficial() {
  // console.log(type);
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <div className="w-full bg-white dark:bg-dark h-screen pt-16 overflow-y-auto">
          <div className="flex items-center gap-2 pt-1 pb-3 px-3">
            <h1 className="text-xs text-zinc-500 uppercase dark:text-zinc-400">Integration</h1>
            <FaChevronRight className="text-zinc-500 text-xs"/>
            <h1 className="text-xs font-bold uppercase">Whatsapp Non Official</h1>
          </div>
          <WhatsappNonOfficialList />
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