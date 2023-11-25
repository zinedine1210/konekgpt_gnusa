import { useContext, useEffect } from "react";
import {BsArrowLeft} from "react-icons/bs"
import MinSidebar from "./MinSidebar";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/router";
import AuthRepository from "@/repositories/AuthRepository";
import Swal from "sweetalert2";
import axios from "axios";
import { icon_menus } from "@/utils/icon_menu";
import { getIdMenu } from "@/utils/script";

export default function Sidebar1({ menus }) {
    const context = useContext(MyContext)
    const router = useRouter()

    const handlerRedirect = async (link, id) => {
        localStorage.setItem("view", 2)
        context.setData({...context, view:2})
        router.push(`${link}?m=${id}`)
    }

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
    
    const getAddOns = JSON.parse(localStorage.getItem("eventAddOns"))
    
  return (
    <aside className={`${context.minimize ? "":`${context.view == 1 ? "fixed top-0 left-0 w-screen z-20 md:z-10 md:relative md:w-64":"hidden md:block md:w-64"}`} flex h-screen bg-white rtl:border-r-0 rtl:border-l dark:bg-zinc-900 dark:border-zinc-700`}>
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
                                            const getThisMenu = router.query?.m ? router.query.m.includes(menu.id) : getIdMenu(context.menus, menu.id)

                                            if(menu.show)
                                            return (
                                                <button key={key2} onClick={() => handlerRedirect(menu.route, menu.id)} className={`${getThisMenu &&  "bg-blue-100 dark:bg-dark dark:hover:bg-zinc-800 dark:hover:text-zinc-200"} hover:bg-zinc-100 text-sm w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
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
                        :
                        <div>
                            <h1 className="text-sm font-bold">Menu not found for you</h1>
                            <p className="text-xs font-light">Request to superadmin give you permission</p>
                        </div>
                        :
                        <div className="space-y-3">
                            <div className="rounded-md shadow-md bg-zinc-200 animate-pulse w-1/2 h-7 mb-10"></div>
                            {
                                new Array(14).fill("menu").map((item) => {
                                    return (
                                        <div className="rounded-md shadow-md bg-zinc-200 animate-pulse w-full h-6">

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
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