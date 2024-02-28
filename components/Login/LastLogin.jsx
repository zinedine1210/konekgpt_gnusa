import { useEffect } from "react"

export default function LastLogin(props) {

    const lastAccount = props.lastLogin ? props?.lastLogin[props?.lastLogin?.length - 1] : null

  return (
    <div className="flex items-center justify-between w-full mt-6">
        <div className="flex items-center">

            <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>
            <div className="mx-4">
                <p className="text-zinc-500 text-sm dark:text-zinc-400">Continue as</p>
                    {dataChat.extendedTextMessage.text.length > 33 ? dataChat.extendedTextMessage.text.substring(0, 33)+"..." : dataChat.extendedTextMessage.text}
            </div>

            <button className="btn-secondary mr-2">Login</button>
            <button className="btn-primary">Change</button>
        </div>


    </div>
  )
}
