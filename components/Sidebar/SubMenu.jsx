import { MyContext } from '@/context/MyProvider'
import { icon_menus } from '@/utils/icon_menu'
import { getIdMenu } from '@/utils/script'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

export default function SubMenu({ menus }) {
    const router = useRouter()
    const context = useContext(MyContext)

    // console.log(subMenus);
    const handlerRedirect = async (link, id) => {
      localStorage.setItem("view", 3)
      context.setData({...context, view:3})
      router.push(`${link}?m=${id}`)
    }
  // console.log(router.pathname);

  return (
    <aside className={`${context.view == 2 ? "fixed top-0 left-0 w-screen h-screen z-20":"hidden md:block"} md:z-0 md:relative h-screen md:w-60 pt-16 bg-white border-r`}>
      <div className='w-full'>
        <label className="px-3 text-xs text-zinc-500 uppercase dark:text-zinc-400">{menus[0].flag}</label>

        <div className="mt-2">
          {
            menus.map((item, key) => {
              const getThisMenu = router.query?.m ? router.query.m == item.id : getIdMenu(context.menus, item.id)
              // console.log(router.query.m, item.id, getThisMenu);

              return (
                <button key={key} onClick={() => handlerRedirect(item.route, item.id)} className={`${getThisMenu && ("bg-blue-100 dark:bg-dark dark:hover:bg-zinc-800")} w-full transition-all duration-300 p-3 flex gap-2 cursor-pointer relative items-center text-sm dark:hover:text-zinc-200 hover:bg-zinc-100`}>
                  {icon_menus[item.id]}  
                  <h1>{item.name}</h1>
                </button>
              )
            })
          }
        </div>
      </div>
    </aside>
  )
}
