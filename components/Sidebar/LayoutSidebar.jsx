import React, { useContext, useEffect } from 'react'
import SubMenu from './SubMenu'
import { MyContext } from '@/context/MyProvider'
import { useRouter } from 'next/router'
import axios from 'axios'
import Sidebar1 from './Sidebar1'

export default function LayoutSidebar() {
  const context = useContext(MyContext)
  const router = useRouter()
  const { m } = router.query


  useEffect(() => {
    if(!context.menus){
      const getLocalMenu = JSON.parse(localStorage.getItem("client_menus"))
      
      if(getLocalMenu){
        // console.log(getLocalMenu);
        context.setData({...context, menus:getLocalMenu})
      }else{
        console.log("masa gada cok")
        axios.get("/client_menu.json").then(res => {
          console.log("get client menu json =>", res.data);
          localStorage.setItem("client_menus", JSON.stringify(res.data))
          context.setData({...context, menus:res.data})
        })
      }
    }
  }, [context])

  const getId = () => {
    if(context.menus){
      const id = context.menus.find(res => res.route == router.asPath)?.['id']
      return id
    }
  }

  const breadPathname = m ?? getId()

  const getSubMenus = (idM) => {
    let dataResult = null

    context.menus.forEach(element => {
      const findOne = element.menus.find(res => res.id == idM)
      if(findOne){
        if(findOne.parent == ""){
          // kalau dia tidak punya parent
          const filter = element.menus.filter(res => res.parent == findOne.id)
          // console.log("masuk ke if", filter);
          dataResult = filter
        }else{
          const filter = element.menus.filter(res => res.parent == findOne.parent)
          // console.log("masuk ke else", filter);
          dataResult = filter
        }

      }
    });

    return dataResult
  }

  // this page to submenu first
  const subMenus = context.menus ? getSubMenus(breadPathname) : null
  
  return (
    <div className='flex'>
      <Sidebar1 />
      {
        subMenus ? subMenus.length > 0 && (
          <SubMenu menus={subMenus}/>
        )
        :""
      }
    </div>
  )
}
