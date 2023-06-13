import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsArrowRight, BsCheckCircle, BsChevronRight, BsInbox } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiOutlinePuzzle, HiOutlineSpeakerphone, HiOutlineUsers } from "react-icons/hi";
import { TfiLayoutGrid2 } from "react-icons/tfi";

export default function MinSidebar() {
    const context = useContext(MyContext)
    const router = useRouter()


    const handlerRedirect = async (link) => {
        context.setData({...context, view:2, minimize:true})
        router.push(link)
    }

  return (
    <div className={`flex flex-col items-center w-16 h-screen pt-16 pb-10 bg-white dark:bg-zinc-900 dark:border-zinc-700`}>
        <nav className="flex flex-col items-center flex-1 space-y-3">
            <button onClick={() => context.setData({...context, minimize:false})} className="p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100">
                <BsArrowRight className="w-6 h-6"/>
            </button>
            <button onClick={() => handlerRedirect("/usr")} className={`${router.asPath == "/usr" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <TfiLayoutGrid2 className="w-6 h-6"/>
            </button>
            <button onClick={() => handlerRedirect("/usr/inbox")} className={`${router.asPath == "/usr/inbox" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <BsInbox className="w-6 h-6"/>
            </button>
            {/* <button onClick={() => handlerRedirect("/usr/broadcast")} className={`${router.asPath == "/usr/broadcast" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <HiOutlineSpeakerphone className="w-6 h-6"/>
            </button> */}
            <button onClick={() => handlerRedirect("/usr/knowledge")} className={`${router.asPath == "/usr/knowledge" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
            </button>
            <button onClick={() => handlerRedirect("/usr/contacts")} className={`${router.asPath == "/usr/contacts" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <HiOutlineUsers className="w-6 h-6"/>
            </button>
            <button onClick={() => handlerRedirect("/usr/unanswer-question")} className={`${router.asPath == "/usr/unanswer-question" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
            </button>

            <button onClick={() => handlerRedirect("/usr/faq")} className={`${router.asPath == "/usr/faq" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
            </button>

            <button onClick={() => handlerRedirect("/usr/integration")} className={`${router.asPath == "/usr/integration" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <HiOutlinePuzzle className="w-5 h-5"/>
            </button>
            <button onClick={() => handlerRedirect("/usr/usage-report")} className={`${router.asPath == "/usr/usage-report" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <FaTasks className="w-5 h-5"/>
            </button>
            <button onClick={() => handlerRedirect("/usr/subscription")} className={`${router.asPath == "/usr/subscription" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <BsCheckCircle className="w-5 h-5"/>
            </button>
            <button onClick={() => handlerRedirect("/usr/settings")} className={`${router.asPath == "/usr/settings" ? "bg-blue-100":"dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100"} p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </nav>
        <div className="flex flex-col items-center mt-4 space-y-4">
            <a>
                <img className="object-cover w-8 h-8 rounded-lg" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" />
            </a>

            <a className="text-zinc-500 transition-colors duration-200 rotate-180 dark:text-zinc-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </a>
        </div>
    </div>
  )
}
