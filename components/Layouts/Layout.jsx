import { useContext, useEffect, useState } from "react"
import Seo from "../Seo"
import HelpButton from "../Templates/HelpButton"
import Navbar from "../Templates/Navbar"
import Sidebar from "../Sidebar/Sidebar1"
import { MyContext } from "@/context/MyProvider"
import SubMenu from "../Sidebar/SubMenu"
import LayoutSidebar from "../Sidebar/LayoutSidebar"

export default function Layout({children, title, desc, image}) {
  const context = useContext(MyContext)
  const view = context.view;
  
  useEffect(() => {
    // pengaturan view
    const getView = localStorage.getItem("view")
    // console.log("layout - setting view to", getView);

    if(!view){
      if(getView){
        const getMinimize = JSON.parse(localStorage.getItem("minimize"))
        console.log("layout - already has view", getView, getMinimize);
        context.setData({...context, view:getView, minimize:getMinimize})
      }else{
        localStorage.setItem("view", 1)
        localStorage.setItem("minimize", false)
        context.setData({...context, view:1, minimize:false})
      }
    }
  }, [view])

  return (
    <>
      <Seo 
        title={title}
        description={desc}
        image={image ? image:null}
      />

      <section style={{backgroundImage:"url('/images/bodyMain.jpg')"}} className="bg-center bg-cover w-screen flex items-center justify-center h-screen">
        <content className="w-full h-full max-h-[1080px] max-w-[1920px] overflow-hidden relative md:rounded-2xl shadow-md">
          <Navbar />
          <HelpButton />
          <div className="overflow-x-hidden relative flex">
            <LayoutSidebar />
            <section className="relative bg-zinc-100 w-full overflow-y-auto h-screen max-h-[1080px] max-w-[1920px]">
              {children}
            </section>
          </div>
        </content>
      </section>
    </>
  )
}
