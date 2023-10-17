import { useContext, useEffect, useState } from "react"
import Seo from "../Seo"
import HelpButton from "../Templates/HelpButton"
import Navbar from "../Templates/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import { MyContext } from "@/context/MyProvider"

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

      <section className="max-h-screen w-full">
        <Navbar />
        <div className="w-full flex">
          <HelpButton />
          <Sidebar />
          {children}
        </div>
      </section>
    </>
  )
}
