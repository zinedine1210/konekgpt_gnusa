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
  const [datatimeout, setDatatimeout] = useState(null)

  const handlerKeyword = (value) => {
    clearTimeout(datatimeout)
    let getdatatimeout = setTimeout(() => {
        let newData = null

        if(value == ""){
            newData = context.allChatList
        }else{
            newData = context.allChatList.filter(res => {
              if(res?.messages?.[0]?.message?.message?.conversation && res?.messages?.[0]?.message?.message?.conversation.toLowerCase().includes(value.toLowerCase())){
                return res
              }
              if(res.id.split("@")[0].includes(value)){
                return res
              }
            })
        }

        context.setData({...context, chatFilter:newData})
    }, 1000);
    setDatatimeout(getdatatimeout)
  }


  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden md:block"} md:z-0 md:relative md:w-1/4 bg-white mt-1`}>
            <div className='px-3 absolute top-0 bg-white left-0 w-full shadow-md pt-16 z-20'>
                <label className="block text-sm px-3 md:text-xs text-zinc-500 uppercase dark:text-zinc-400 ">INBOX</label>
                <input type="text" disabled={context.chatFilter ? false:true} onChange={(e) => handlerKeyword(e.target.value)} name="" id="" className='input-search w-full my-2' placeholder='Search by Number or Last Message' />
            </div>
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