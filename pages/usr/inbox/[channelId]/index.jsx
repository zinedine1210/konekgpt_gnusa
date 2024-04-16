import { MyContext } from "@/context/MyProvider";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Seo from "@/components/Seo";
import { IoInformationCircle, IoSettings } from "react-icons/io5";
import Link from "next/link";
import { BsChatFill, BsChevronLeft, BsFillPatchQuestionFill } from "react-icons/bs";
import { HiQuestionMarkCircle } from "react-icons/hi";
import InformationInbox from "@/components/Inbox/TrainingID/InformationInbox";
import FAQInbox from "@/components/Inbox/TrainingID/FAQInbox";
import UnanswerQuestionInbox from "@/components/Inbox/TrainingID/UnanswerQuestionInbox";
import ContactInbox from "@/components/Inbox/TrainingID/ContactInbox";
import KnowledgeRepository from "@/repositories/KnowledgeRepository";
import ScreenReader from "@/components/ScreenReader";
import ChatLayout from "@/components/Inbox/TrainingID/Chat/ChatLayout";
import SettingInbox from "@/components/Inbox/TrainingID/SettingInbox";
import ChannelRepository from "@/repositories/ChannelRepository";


export default function TrainingInbox({ params }) {
  const { channelId, m } = params
  const {t} = useTranslation("common")
  const context = useContext(MyContext)
  const [active, setActive] = useState(1)

  const [data, setData] = useState({
    channelInformation: null,
    knowledgeInformation: null
  })

  useEffect(() => {
    if(!data.channelInformation){
      getAllMountingData()
    }
  }, [data]);

  const getAllMountingData = async () => {
    const getxa = JSON.parse(localStorage.getItem("XA"))
    const result = await ChannelRepository.getOneChannel({
      xa: {
        XA: getxa
      },
      id: channelId
    })
    if(result?.data){
      const resultKnowledge = await getKnowledge(result.data.knowledge_id)
      setData({
        ...data,
        knowledgeInformation: resultKnowledge,
        channelInformation: result.data
      })
      console.log(resultKnowledge, result.data)
    }
  }

  const getKnowledge = async (knowledgeId) => {
    const getxa = JSON.parse(localStorage.getItem("XA"))
    const result = await KnowledgeRepository.getOneKnowledge({
        xa: {
          XA: getxa
        },
        id: knowledgeId
    })
    if(result?.data){
      return result.data
    }else{
      return {}
    }
  }

  const handleClick = (value) => {
    setActive(value)
    context.setData({...context, view: 2})
  }

  return (
    <>
      <Seo 
        title={"Inbox Training"}
      />
      <ScreenReader />
      <div className="flex">
        <div className={`${!context.view || context.view == 1 ? 'fixed xl:relative':'hidden xl:block'} top-0 left-0 w-screen h-screen z-20 xl:w-64 xl:border-r xl:h-screen max-h-screen overflow-auto py-4 bg-gray-800`}>
          <label className="block text-sm xl:text-xs text-white uppercase dark:text-zinc-400 px-2">Setup Knowledge</label>
          <div className="px-2 mt-3">
            <input type="text" className="input-search w-full" placeholder="Search Menu" />
          </div>
          <div className="space-y-2 mt-5">
            <button onClick={() => handleClick(1)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><BsChatFill className="text-xl text-blue-500" />Chat</button>
            <button onClick={() => handleClick(2)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><IoInformationCircle className="text-xl text-blue-500" /> Information</button>
            <button onClick={() => handleClick(3)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><HiQuestionMarkCircle className="text-xl text-blue-500" />Unanswer Question</button>
            <button onClick={() => handleClick(4)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><BsFillPatchQuestionFill className="text-xl text-blue-500" /> FAQ</button>
            <button onClick={() => handleClick(8)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><FaUser className=" text-blue-500" />Contacts</button>
            <button onClick={() => handleClick(9)} className="w-full hover:bg-gray-900 text-start duration-300 ease-in-out px-5 py-2 text-white flex items-center gap-2 text-sm"><IoSettings className=" text-blue-500" />Settings</button>
            <Link href={"/usr/integration/whatsapp?m=clm_integration"}>
              <button className="w-full hover:bg-red-500 hover:text-white text-start duration-300 ease-in-out px-5 py-2 flex items-center gap-2 text-red-500 font-semibold mt-5">Close</button>
            </Link>
          </div>
        </div>

        {
          context.view >= 2 && (
            <>
              {
                active == 1 && (
                  <ChatLayout channelId={channelId}/>
                )
              }
              {
                active == 2 && (
                  <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen p-2 xl:p-10">
                    <div className="xl:hidden w-full border-b border-zinc-500 dark:border-zinc-300 pb-2 mb-5">
                      <button className="xl:hidden flex items-center gap-2 text-sm font-semibold" onClick={() => context.setData({...context, view: 1})}>
                        <BsChevronLeft className="text-blue-500 font-bold"/>
                        Close
                      </button>
                    </div>
                    <InformationInbox data={data}/>
                  </div>
                )
              }
              {
                active == 3 && (
                  <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
                    <div className="xl:hidden w-full border-b border-zinc-500 dark:border-zinc-300 py-2 px-2">
                      <button className="xl:hidden flex items-center gap-2 text-sm font-semibold" onClick={() => context.setData({...context, view: 1})}>
                        <BsChevronLeft className="text-blue-500 font-bold"/>
                        Close
                      </button>
                    </div>
                    <UnanswerQuestionInbox />
                  </div>
                )
              }
              {
                active == 4 && (
                  <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
                    <div className="xl:hidden w-full border-b border-zinc-500 dark:border-zinc-300 py-2 px-2">
                      <button className="xl:hidden flex items-center gap-2 text-sm font-semibold" onClick={() => context.setData({...context, view: 1})}>
                        <BsChevronLeft className="text-blue-500 font-bold"/>
                        Close
                      </button>
                    </div>
                    <FAQInbox /> 
                  </div>
                )
              }
              {
                active == 8 && (
                  <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
                    <div className="xl:hidden w-full border-b border-zinc-500 dark:border-zinc-300 py-2 px-2">
                      <button className="xl:hidden flex items-center gap-2 text-sm font-semibold" onClick={() => context.setData({...context, view: 1})}>
                        <BsChevronLeft className="text-blue-500 font-bold"/>
                        Close
                      </button>
                    </div>
                    <ContactInbox />
                  </div>
                )
              }
              {
                active == 9 && (
                  <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen">
                    <div className="xl:hidden w-full border-b border-zinc-500 dark:border-zinc-300 py-2 px-2">
                      <button className="xl:hidden flex items-center gap-2 text-sm font-semibold" onClick={() => context.setData({...context, view: 1})}>
                        <BsChevronLeft className="text-blue-500 font-bold"/>
                        Close
                      </button>
                    </div>
                    <SettingInbox data={data}/>
                  </div>
                )
              }
            </>
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