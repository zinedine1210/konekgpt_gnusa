import DropdownChatUser from "@/components/Templates/DropdownChatUser";
import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";

export default function CardChatUser({ index, dataChat }) {
  const context = useContext(MyContext)
  return (
    <div className="w-full">
            {index > 0 ? context.chatDetail.messages[index - 1].user_id != dataChat.user_id ? 
                <h1 className="text-zinc-500 dark:text-zinc-300 text-sm py-1">{dataChat.user_name}</h1>
            :"" :""}
            
            {/* <h1 className="text-zinc-500 dark:text-zinc-300 text-sm py-1">{dataChat.user_name}</h1> */}
            <div className="space-y-2">
              <div className="w-fit bg-white dark:bg-darkPrimary pt-2 pb-6 px-2 shadow-md rounded-md min-w-[80px] max-w-xl relative group">
                  <DropdownChatUser dataChat={dataChat} />
                  <h1 className="text-xs xl:text-base">{dataChat.msg}</h1>
                  <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500 dark:text-zinc-300 flex items-center gap-2">
                      {/* {getTimeDate(Number(dataChat.data?.messageTimestamp) * 1000)} */}
                      10:30
                  </span>
              </div>
            </div>
        </div>
  )
}
