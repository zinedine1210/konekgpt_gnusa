import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import {BsArrowLeft, BsCheckCircle, BsFillFileEarmarkPdfFill, BsInbox, BsPlugin, BsTrashFill} from "react-icons/bs"
import { HiOutlinePuzzle, HiOutlineSpeakerphone, HiOutlineUsers } from "react-icons/hi";
import {IoLink} from "react-icons/io5"
import MinSidebar from "./MinSidebar";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/router";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FaTasks } from "react-icons/fa";
import AuthRepository from "@/repositories/AuthRepository";
import Swal from "sweetalert2";

export default function Sidebar() {
    const context = useContext(MyContext)
    const router = useRouter()

    const handlerRedirect = async (link) => {
        router.push(link)
        context.setData({...context, view:2})
    }

    const handlerLogout = async () => {
        const result = await AuthRepository.postLogout({XA:JSON.parse(localStorage.getItem("XA"))})
        console.log(result);
        if(result?.type == "success"){
            localStorage.clear()
            Swal.fire(
                "info",
                "Logout"
            )
            router.push("/")
        }
    }

  return (
    <aside className={`${context.minimize ? "":`${context.view == 1 ? "fixed top-0 left-0 w-screen z-20 md:z-10 md:relative md:w-2/12":"hidden md:block md:w-2/12"}`} flex h-screen bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-zinc-900 dark:border-zinc-700`}>
        {
            context.minimize ?
                <MinSidebar /> 
            :
            <div className="flex flex-col justify-between h-screen px-5 pt-16 pb-5 overflow-y-auto bg-white border-l border-r w-full sm:w-full dark:bg-zinc-900 dark:border-zinc-700">
                {/* <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>

                    <input type="text" className="w-full py-1.5 pl-10 pr-4 text-zinc-700 bg-white border rounded-md dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                </div> */}
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-1 ">
                        <div className="flex items-center justify-between pt-1 pb-2 px-3">
                            <label className="text-xs text-zinc-500 uppercase dark:text-zinc-400">Content</label>
                            <button className="hidden md:block" onClick={() => context.setData({...context, minimize:true})}>
                                <BsArrowLeft />
                            </button>
                        </div>
                        <button onClick={() => handlerRedirect("/usr")} className={`${router.asPath == "/usr" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <TfiLayoutGrid2 />
                            <span className="mx-2 text-sm font-medium">Dashboard</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/inbox")} className={`${router.asPath == "/usr/inbox" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <BsInbox />
                            <span className="mx-2 text-sm font-medium">Inbox</span>
                        </button>
                        {/* <button onClick={() => handlerRedirect("/usr/broadcast")} className={`${router.asPath == "/usr/broadcast" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <HiOutlineSpeakerphone className="text-lg"/>
                            <span className="mx-2 text-sm font-medium">Broadcast</span>
                        </button> */}
                        <button onClick={() => handlerRedirect("/usr/knowledge")} className={`${router.asPath == "/usr/knowledge" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Knowledge</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/contacts")} className={`${router.asPath == "/usr/contacts" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <HiOutlineUsers />

                            <span className="mx-2 text-sm font-medium">Contacts</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/unanswer-question")} className={`${router.asPath == "/usr/unanswer-question" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Unanswer Question</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/faq")} className={`${router.asPath == "/usr/faq" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">FAQ Builder</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/integration/whatsapp")} className={`${router.asPath == "/usr/integration/whatsapp" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <HiOutlinePuzzle className="w-5 h-5"/>

                            <span className="mx-2 text-sm font-medium">Integration</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/add-ons")} className={`${router.asPath == "/usr/add-ons" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <BsPlugin className="w-5 h-5"/>

                            <span className="mx-2 text-sm font-medium">Add Ons</span>
                        </button>
                        
                        <button onClick={() => handlerRedirect("/usr/usage-report")} className={`${router.asPath == "/usr/usage-report" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <FaTasks className="w-5 h-5"/>

                            <span className="mx-2 text-sm font-medium">Usage Report</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/subscription")} className={`${router.asPath == "/usr/subscription" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <BsCheckCircle className="w-5 h-5"/>

                            <span className="mx-2 text-sm font-medium">Subscription</span>
                        </button>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">Customization</label>
                        <button onClick={() => handlerRedirect("/usr/themes")} className={`${router.asPath == "/usr/themes" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Themes</span>
                        </button>
                        <button onClick={() => handlerRedirect("/usr/settings")} className={`${router.asPath == "/usr/settings" ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Settings</span>
                        </button>
                    </div>
                </nav>
                <div className="mt-6">
                    {/* <div className="p-3 bg-zinc-100 rounded-lg dark:bg-zinc-800">
                        <h2 className="text-sm font-medium text-zinc-800 dark:text-white">New feature availabel!</h2>

                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi velit.</p>

                        <img className="object-cover w-full h-32 mt-2 rounded-lg" src="https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&h=1374&q=80" alt=""/>
                    </div> */}

                    <div className="flex items-center justify-between mt-6">
                        <a href="#" className="flex items-center gap-x-2">
                            <img className="object-cover rounded-full h-7 w-7" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200"></span>
                        </a>
                        
                        <button onClick={() => handlerLogout()} className="text-zinc-500 transition-colors duration-200 rotate-180 dark:text-zinc-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        }
  </aside>
  )
}