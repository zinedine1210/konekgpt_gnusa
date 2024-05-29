import { useContext } from "react";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/router";
import AuthRepository from "@/repositories/AuthRepository";
import Swal from "sweetalert2";
import { icon_menus } from "@/utils/icon_menu";
import { getIdMenu } from "@/utils/script";

export default function Sidebar1() {
    const context = useContext(MyContext)
    const router = useRouter()

    const handlerRedirect = async (link, id) => {
        localStorage.setItem("view", 2)
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
        context.setData({...context.data, minimize: true})
    }

    const handleProfile = () => {
        router.push("/usr/profile")
        localStorage.setItem("view", 2)
    }
    
  return (
    <aside className={`${localStorage.getItem("view") == 1 ? "fixed top-0 left-0 w-screen z-20 xl:z-10 xl:relative xl:w-60":"hidden xl:block xl:w-60"} flex h-screen bg-white rtl:border-r-0 rtl:border-l dark:bg-red-500 dark:border-zinc-700`}>
        <div className="flex flex-col justify-between h-screen px-5 pt-16 pb-5 overflow-y-auto bg-white border-l border-r w-full dark:bg-darkPrimary dark:border-dark">
            <nav className="-mx-3 space-y-6 ">
                {
                    context.menus ?
                    context.menus.length > 0 ?
                    context.menus.map((flagParent, key) => {
                        return (
                            <div className="space-y-1" key={key}>
                                <div className="flex items-center justify-between pt-1 pb-2 px-3">
                                    <label className="text-xs text-zinc-500 uppercase dark:text-zinc-400">{flagParent.parentFlag}</label>
                                </div>
                                {
                                    flagParent.menus.filter(res => res.parent == "").map((menu, key2) => {
                                        const getThisMenu = router.query?.m ? router.query.m.includes(menu.id) : getIdMenu(flagParent.menus, menu.id, router.asPath)

                                        if(menu.show)
                                        return (
                                            <button key={key2} onClick={() => handlerRedirect(menu.route, menu.id)} className={`${getThisMenu &&  "bg-blue-100 dark:bg-darkSecondary dark:hover:text-zinc-200"} hover:bg-zinc-100 dark:hover:bg-darkSecondary text-sm w-full flex items-center px-3 py-2 text-zinc-600 transition-colors duration-300 transform rounded-lg dark:text-zinc-200`}>
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
                                    <div key={item} className="rounded-md shadow-md bg-zinc-200 animate-pulse w-full h-6"></div>
                                )
                            })
                        }
                    </div>
                }
            </nav>
            <div className="mt-6">

                <div className="flex items-center justify-between mt-6">
                    <button onClick={() => handleProfile()} className="flex items-center gap-x-2">
                        <img className="object-cover rounded-full h-7 w-7" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200"></span>
                    </button>
                    
                    <button onClick={() => handlerLogout()} className="text-zinc-500 transition-colors duration-200 rotate-180 dark:text-zinc-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
  </aside>
  )
}