import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";
import { HiCheck } from "react-icons/hi";

export default function CardChatFromMe({ dataChat, index }) {
  const context = useContext(MyContext)
  return (
    <div className="ml-auto w-full">
            {index > 0 ? context.chatDetail.messages[index - 1].user_id != dataChat.user_id ? 
              <h1 className="text-end text-zinc-500 text-sm py-1">You</h1>
            :"" :""}
            <div className="w-fit bg-blue-500 text-white pt-2 pb-6 px-2 shadow-md rounded-md max-w-xl min-w-[80px] ml-auto relative">
                <h1 className="text-xs xl:text-base">{dataChat.msg}</h1>
                <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-300 flex items-center gap-2">
                    {/* {getTimeDate(Number(dataChat.data?.messageTimestamp) * 1000)}  */}
                    10:20
                    <div className={` flex items-center`}>
                        <HiCheck className={`text-base -mr-2.5`}/>
                        <HiCheck className='text-base'/>
                    </div>
                </span>
            </div>
        </div>
  )
}
