import { useContext, useEffect } from "react";
import {BsArrowLeft} from "react-icons/bs"
import MinSidebar from "./MinSidebar";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/router";
import AuthRepository from "@/repositories/AuthRepository";
import Swal from "sweetalert2";
import axios from "axios";
import { icon_menus } from "@/utils/icon_menu";

export default function Sidebar() {
    const context = useContext(MyContext)
    const router = useRouter()

    const handlerRedirect = async (link) => {
        router.push(link)
        localStorage.setItem("view", 2)
        context.setData({...context, view:2})
    }

    useEffect(() => {
        if(!context.menus){
            axios.get("/client_menu.json").then(res => {
                console.log(res);
                // console.log("ngambil data lagi");
                context.setData({...context, menus:res.data})
            })
        }
    }, [context.menus])

    const handlerLogout = async () => {
        const result = await AuthRepository.postLogout({XA:JSON.parse(localStorage.getItem("XA"))})
        console.log(result);
        if(result?.status == 0){
            localStorage.clear()
            Swal.fire(
                "info",
                "Logout"
            )
            router.push("/")
        }
    }

    const handlerMinimize = () => {
        localStorage.setItem("minimize", true)
        context.setData({...context, minimize:true})
    }
    
  return (
    <aside className={`border  border-red-400 ${context.minimize ? "":`${context.view == 1 ? "fixed top-0 left-0 w-screen z-20 md:z-10 md:relative md:w-2/12":"hidden md:block md:w-2/12"}`} flex h-screen bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-zinc-900 dark:border-zinc-700`}>
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
                    {
                        context.menus ?
                        context.menus.length > 0 ?
                        context.menus.map((flagParent, key) => {
                            return (
                                <div className="space-y-1 " key={key}>
                                    <div className="flex items-center justify-between pt-1 pb-2 px-3">
                                        <label className="text-xs text-zinc-500 uppercase dark:text-zinc-400">{flagParent.parentFlag}</label>
                                        {
                                            key == 0 && (
                                                <button className="hidden md:block" onClick={() => handlerMinimize()}>
                                                    <BsArrowLeft />
                                                </button>
                                            )
                                        }
                                    </div>
                                    {
                                        flagParent.menus.filter(res => res.parent == "").map((menu, key2) => {
                                            return (
                                                <button key={key2} onClick={() => handlerRedirect(menu.route)} className={`${router.asPath == menu.route ? "bg-blue-100":"hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 hover:text-zinc-700"} w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
                                                    {
                                                        icon_menus[menu.id]
                                                    }
                                                    <span className="mx-2 text-sm font-medium">{menu.name}</span>
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                        :"Kosong"
                        :"Loading"
                    }

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