import React from 'react'
import MenuItem from './MenuItem'

export default function Menus({menus, target, indexing}) {

  return (
    <div className={``}>
        {
            menus.map((menu) => {
              const thisMenuisOpen = menu.id.split("_")[indexing] == target?.[indexing]
              // console.log(menu.name,thisMenuisOpen);
                return (
                    <MenuItem indexing={indexing} isOpen={thisMenuisOpen} item={menu}/>
                )
            })
        }
    </div>
  )
}
