import { MyContext } from '@/context/MyProvider';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import Menus from './Menus';
import { useRouter } from 'next/router';

export default function SidebarMenu() {
    const context = useContext(MyContext)
    const { asPath } = useRouter()


    const organizeMenuData = (menuData) => {
        const menuMap = new Map();
      
        menuData.forEach((item) => {
          const { id, parent } = item;
          if (!menuMap.has(id)) {
            menuMap.set(id, { ...item, submenu: [], isOpen: false, isClicked: false });
          }
      
          if (parent && menuMap.has(parent)) {
            menuMap.get(parent).submenu.push(menuMap.get(id));
          }
        });
      
        return Array.from(menuMap.values()).filter((item) => !item.parent);
    };
    

    useEffect(() => {
        if(!context.menus){
            axios.get("/client_menu.json").then(res => {
                console.log(res);
                // console.log("ngambil data lagi");
                context.setData({...context, menus:res.data})
            })
        }
    }, [context.menus])

    // console.log(organizeMenuData(parent.menus));
    
    return (
    <div className='py-20'>
        {
            context.menus ?
            context.menus.length > 0 ?
            context.menus.map((parent) => {
              const openNow = parent.menus.find(res => res.route == asPath)?.['id'].split("_")
              // console.log(organizeMenuData(parent.menus));
              return (
                  <div>
                      <h1 className='bg-blue-500'>{parent.parentFlag}</h1>

                      <Menus target={openNow} indexing={1} menus={organizeMenuData(parent.menus)}/>
                  </div>
              )
            })
            :"":""
        }
    </div>
  )
}
