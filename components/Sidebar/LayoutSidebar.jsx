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
        context.setData({...context, menus:getLocalMenu})
      }else{
        axios.get("/client_menu.json").then(async res => {
          let arr = []
          res.data.forEach(element => {
            const finalData = restructuredMenuData(element)
            element.menus = finalData
            arr.push(element)
          });
          localStorage.setItem("client_menus", JSON.stringify(arr))
          context.setData({...context, menus: arr})
        })
      }
    }
  }, [context])

  const restructuredMenuData = (menusData) => {
    let groupingData = menusData.menus.filter(res => res.parent == "").map((res) => {
      res.arrParent = []
      return res
    })
    menusData.menus.forEach((ele, index) => {
      if(ele.parent == "") return false
      groupingData.find(res => res.id == ele.parent)?.arrParent.push(ele)
    })

    return groupingData
  }

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
        dataResult = findOne;
      }else{
        if(!idM) return false
        const split = idM.split("_")
        const slice = split.slice(0, split.length - 1)
        const join = slice.join("_")
        const findOne = element.menus.find(res => res.id == join)
        if(findOne){
          dataResult = findOne
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
        subMenus ? subMenus.arrParent.length > 0 && (
          <SubMenu menus={subMenus.arrParent}/>
        )
        :""
      }
    </div>
  )
}
