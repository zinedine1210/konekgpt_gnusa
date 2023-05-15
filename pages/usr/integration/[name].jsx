import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useState } from "react";
import {FaChevronRight, FaPowerOff, FaTelegram, FaTelegramPlane} from "react-icons/fa"
import ChannelType from "@/components/Integration/ChannelType";
import TelegramList from "@/components/Integration/Telegram/TelegramList";
import WhatsappList from "@/components/Integration/Whatsapp/WhatsappList";


export default function Channel({type}) {
  console.log(type);
  const {t} = useTranslation("common")
  const [data, setData] = useState(null)

  const handlerChange = value => {
    setData(value)
  }
  
  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-11/12 bg-zinc-100 relative h-screen flex">
          <ChannelType />
          <div className="w-5/6 border bg-white relative h-screen pt-16 overflow-y-auto">
            <div className="flex items-center gap-2 pt-1 pb-3 px-3">
              <h1 class="text-xs text-zinc-500 uppercase dark:text-zinc-400">Integration</h1>
              <FaChevronRight className="text-zinc-500 text-xs"/>
              <h1 class="text-xs font-bold uppercase">{type}</h1>
            </div>
            {
              type == "telegram" ?
                <TelegramList />
              :""
            }
            {
              type == "whatsapp" ?
                <WhatsappList />
              :""
            }
          </div>
        </section>
      </Suspense>
    </Layout>
  )
}



export async function getServerSideProps({ locale, query }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
      type:query.name
    },
  };
}