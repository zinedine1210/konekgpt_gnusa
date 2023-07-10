import { MyContext } from "@/context/MyProvider";
import Layout from "../../../components/Layouts/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import {HiOutlineArrowSmRight, HiX} from "react-icons/hi"
import ChatList from "@/components/Inbox/ChatList";
import DetailChat from "@/components/Inbox/DetailChat";
import { FaEllipsisV } from "react-icons/fa";
import WhatsappRepository from "@/repositories/WhatsappRepository";
import ModalCreateGroup from "@/components/Inbox/ModalCreateGroup";
import InfoPersonal from "@/components/Inbox/InfoPersonal";
import InfoGroup from "@/components/Inbox/InfoGroup";


export default function Inbox() {
  const {t} = useTranslation("common")
  const context = useContext(MyContext)
  const [keyword, setKeyword] = useState("")

  const [open, setOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, []);

  const handleOutsideClick = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
          setOpen(false);
      }
  };

  const handlerKeyword = (value) => {
    setKeyword(value)
  }


  return (
    <Layout title="HOME" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen flex">
          {
            context.modal == "modalcreategroup" && (
              <ModalCreateGroup />
            )
          }
          <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden md:block"} md:z-0 md:relative md:w-1/4 bg-white mt-1`}>
            <div className='px-3 absolute top-0 bg-white left-0 w-full shadow-md pt-16 z-20'>
              <div className="flex items-center justify-between">
                <label className="block text-sm px-3 md:text-xs text-zinc-500 uppercase dark:text-zinc-400">INBOX</label>
                <div ref={dropRef} className="relative">
                  <button onClick={() => setOpen(true)}>
                    <FaEllipsisV className="text-zinc-500 text-sm"/>
                  </button>
                  <div className={`${open ? "":"hidden"} absolute top-full right-0 shadow-md rounded-md backdrop-blur-md w-44`}>
                    <button onClick={() => context.setData({...context, modal:"modalcreategroup"})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                      Create Group
                    </button>
                    <button onClick={() => context.setData({...context, allChatList:null})} className="hover:bg-blue-100 px-3 py-2 text-sm w-full text-start">
                      Refresh Chat List
                    </button>
                  </div>
                </div>
              </div>
              <input type="text" disabled={context.allChatList ? false:true} onChange={(e) => handlerKeyword(e.target.value)} name="" id="" className='input-search w-full my-2' placeholder='Search by Number or Last Message' />
            </div>
            <ChatList keyword={keyword}/>
          </div>
          {
            context.chatDetail && (
              <DetailChat />
            )
          }
          {
            context.detailContact ? 
              <div className={`md:w-1/4 relative bg-white border border-l`}>
                {
                  context.detailContact?.type == "personal" ? 
                    <InfoPersonal />
                  :""
                }
                {
                  context.detailContact?.type == "group" ?
                    <InfoGroup />
                  :""
                }
              </div>
            :""
          }
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