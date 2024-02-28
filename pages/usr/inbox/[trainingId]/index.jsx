import { MyContext } from "@/context/MyProvider";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext, useEffect, useRef, useState } from "react";
import ChatList from "@/components/Inbox/ChatList";
import DetailChat from "@/components/Inbox/DetailChat";
import { FaChalkboard, FaEllipsisV, FaUser } from "react-icons/fa";
import ModalCreateGroup from "@/components/Inbox/ModalCreateGroup";
import InfoPersonal from "@/components/Inbox/InfoPersonal";
import InfoGroup from "@/components/Inbox/InfoGroup";
import Seo from "@/components/Seo";
import { IoAttach, IoCard, IoInformationCircle } from "react-icons/io5";
import Link from "next/link";
import { BsChatFill, BsFillPatchQuestionFill } from "react-icons/bs";
import { HiQuestionMarkCircle } from "react-icons/hi";
import InformationInbox from "@/components/Inbox/TrainingID/InformationInbox";
import FAQInbox from "@/components/Inbox/TrainingID/FAQInbox";
import UnanswerQuestionInbox from "@/components/Inbox/TrainingID/UnanswerQuestionInbox";
import ContactInbox from "@/components/Inbox/TrainingID/ContactInbox";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";


export default function TrainingInbox({ params }) {
  const { trainingId, m } = params
  const {t} = useTranslation("common")
  const context = useContext(MyContext)
  const [keyword, setKeyword] = useState("")
  const [open, setOpen] = useState(false)
  const dropRef = useRef(null)
  const [active, setActive] = useState(1)

  const [data, setData] = useState({
    information: null,

  })

  useEffect(() => {
    if(context.dataKnowledge){
      const findOne = context.dataKnowledge.find(res => res.id == trainingId)
      setData({...data, information: findOne})
    }else{
      getKnowledge()
    }
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const getKnowledge = async () => {
    const getxa = JSON.parse(localStorage.getItem("XA"))
    const result = await KnowledgeRepository.getAllKnowledge({xa:getxa})
    console.log(result);
    if(result?.data){
      const findOne = result.data.find(res => res.id == trainingId)
      console.log(findOne)
      context.setData({...context, dataKnowledge:result.data})
      setData({...data, information:findOne})
    }
  }

  const handleOutsideClick = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
          setOpen(false);
      }
  };

  const handlerKeyword = (value) => {
    setKeyword(value)
  }


  return (
    <>
      <Seo 
        title={"Inbox Training"}
      />
      <div className="flex">
        <div className="w-64 border-r h-screen max-h-screen overflow-auto py-4 bg-gray-800">
          <label className="block text-sm xl:text-xs text-white uppercase dark:text-zinc-400 px-2">Setup Knowledge</label>
          <div className="px-2 mt-3">
            <input type="text" className="input-search w-full" placeholder="Search Menu" />
          </div>
          <div className="space-y-2 mt-5">
            <button onClick={() => setActive(1)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2"><BsChatFill className="text-xl text-blue-500" />Chat</button>
            <button onClick={() => setActive(2)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2"><IoInformationCircle className="text-xl text-blue-500" /> Information</button>
            <button onClick={() => setActive(3)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2"><HiQuestionMarkCircle className="text-xl text-blue-500" />Unanswer Question</button>
            <button onClick={() => setActive(4)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2"><BsFillPatchQuestionFill className="text-xl text-blue-500" /> FAQ</button>
            <button onClick={() => setActive(8)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2"><FaUser className=" text-blue-500" />Contacts</button>
            <Link href={"/usr/knowledge/training?m=clm_knowledge_training"}>
              <button className="w-full hover:bg-red-500 hover:text-white text-start duration-300 ease-in-out px-5 py-2 flex items-center gap-2 text-red-500 font-semibold mt-5">Close</button>
            </Link>
          </div>
        </div>

        {
          active == 1 && (
            <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
              {
                context.modal == "modalcreategroup" && (
                  <ModalCreateGroup />
                )
              }
              <div className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden xl:block"} xl:z-0 xl:relative xl:w-1/4 bg-white dark:bg-darkPrimary`}>
                <div className='px-3 absolute top-0 bg-white dark:bg-darkPrimary left-0 w-full shadow-md z-20 pt-3'>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm px-3 xl:text-xs text-zinc-500 uppercase dark:text-zinc-400">INBOX</label>
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
                  <div className={`xl:w-1/4 relative bg-white border border-l`}>
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
            </div>
          )
        }
        {
          active == 2 && (
            <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen p-10">
              <InformationInbox data={data.information}/>
            </div>
          )
        }
        {
          active == 3 && (
            <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
              <UnanswerQuestionInbox />
            </div>
          )
        }
        {
          active == 4 && (
            <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
              <FAQInbox /> 
            </div>
          )
        }
        {
          active == 8 && (
            <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen flex">
              <ContactInbox />
            </div>
          )
        }
      </div>
    </>
  )
}



export async function getServerSideProps({ locale, query }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
      params: query
    }
  };
}