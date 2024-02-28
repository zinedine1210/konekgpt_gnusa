import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import {BsPlusCircle} from "react-icons/bs"

export default function DropdownChatUser() {
    const dropRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
  return (
    <div ref={dropRef} className="">
        <button onClick={() => setOpen(!open)} className="absolute top-0 -left-5 w-5 h-5 text-sm flex items-center justify-center rounded-full">
            <FaEllipsisV className="text-xs text-zinc-500"/>
        </button>

        <div className={`${open ? "not-sr-only opacity-100 scale-100":"opacity-0 scale-0"} z-20 overflow-hidden origin-top-left duration-200 absolute top-0 left-full ml-2 bg-gray-800 rounded-b-2xl rounded-r-2xl shadow-md py-2`}>
            <button className="text-xs px-5 py-2 hover:bg-gray-900 duration-300 text-start w-full whitespace-nowrap text-white flex items-center gap-2"><BsPlusCircle className="text-base"/> Unanswer Question</button>
            <button className="text-xs px-5 py-2 hover:bg-gray-900 duration-300 text-start w-full whitespace-nowrap text-white flex items-center gap-2"><BsPlusCircle className="text-base"/> Frequently Asked Question</button>
            <button className="text-xs px-5 py-2 hover:bg-gray-900 duration-300 text-start w-full whitespace-nowrap text-white flex items-center gap-2"><BsPlusCircle className="text-base"/> Copy</button>
            <button className="text-xs px-5 py-2 hover:bg-gray-900 duration-300 text-start w-full whitespace-nowrap text-white flex items-center gap-2"><BsPlusCircle className="text-base"/> Reply</button>
        </div>
    </div>
  )
}
