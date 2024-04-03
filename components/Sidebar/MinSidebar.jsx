import { MyContext } from "@/context/MyProvider";
import AuthRepository from "@/repositories/AuthRepository";
import { icon_menus } from "@/utils/icon_menu";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";

export default function MinSidebar() {
    const context = useContext(MyContext)
    const router = useRouter()


    const handlerRedirect = (link, id) => {
        router.push(`${link}?m=${id}`)
        localStorage.setItem("view", 2)
        context.setData({...context, view:2, minimize:true})
        // console.log("kesini ges");
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
            router.push("/", {scroll:false, swallow:true})
        }
    }

    const handlerCloseMinimize = () => {
        localStorage.setItem("minimize", false)
        context.setData({...context, minimize:false})
    }

  return (
    <div className={`hidden xl:flex flex-col items-center w-14 h-screen pt-16 pb-10 bg-white dark:bg-darkPrimary dark:border-zinc-700 border-r`}>
        <nav className="flex flex-col items-center flex-1 space-y-3">
            <button onClick={() => handlerCloseMinimize()} className="p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-800 hover:bg-zinc-100">
                <BsArrowRight className="w-5 h-5"/>
            </button>
            {
                context.menus ?
                context.menus.length > 0 ?
                context.menus.map((parent) => {
                    return parent.menus.filter(res => res.parent == "").map((menu, key) => {
                        const getThisMenu = router.query?.m ? router.query.m.includes(menu.id) : getIdMenu(context.menus, menu.id)
                        if(menu.show)
                        return (
                            <button key={key} onClick={() => handlerRedirect(menu.route, menu.id)} disabled={getThisMenu} className={`p-1.5 inline-block text-zinc-500 focus:outline-nones transition-colors duration-200 rounded-lg disabled:cursor-not-allowed text-sm disabled:bg-blue-100 dark:disabled:bg-dark dark:hover:bg-dark dark:hover:text-zinc-200 hover:bg-zinc-100`}>
                                {
                                    icon_menus[menu.id]
                                }
                            </button>
                        )
                    })
                })
                :"kosong"
                :"loading"
            }
            
        </nav>
        <div className="flex flex-col items-center mt-4 space-y-4">
            <a>
                <img className="object-cover w-8 h-8 rounded-lg" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" />
            </a>

            <button onClick={() => handlerLogout()} className="text-zinc-500 transition-colors duration-200 rotate-180 dark:text-zinc-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
        </div>
    </div>
  )
}
