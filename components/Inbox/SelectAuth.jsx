import { useEffect, useRef, useState } from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

export default function SelectAuth(props) {
    const dropRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [list, setList] = useState(null)

    const handleOutsideClick = (event) => {
        if (dropRef.current && !dropRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if(!list){
            const data = localStorage.getItem("whatsappChannel") != "undefined" ? JSON.parse(localStorage.getItem("whatsappChannel")) : null
            console.log(data);
            setList(data)
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [list]);

  return (
    <div ref={dropRef} className={`relative bg-zinc-50 py-2 px-4 outline-none border-2 w-full ${open ? "border-lightPrimary bg-white":"hover:bg-zinc-100"}`}>
        <div onClick={() => setOpen(!open)} className="flex items-center justify-between cursor-pointer">
            <h1 className="text-sm mr-5">{props.auth ?? "Select authentication number"}</h1>
            <FaChevronDown className={`${open ? "rotate-180":""} transition-transform duration-300 text-zinc-500 text-xs`}/>
        </div>

        <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 overflow-y-auto shadow-md z-20 w-full transition-all duration-300 absolute bg-white top-full left-0 mt-1`}>
            {
                list && (
                    list.map((item, key) => {
                        return (
                            <button onClick={() => props.setAuth(item.identity)} key={key} disabled={!item.active} className="flex items-center justify-between disabled:bg-red-100 py-2 px-4 w-full text-start text-sm transition-colors duration-300 hover:bg-blue-100">
                                {item.identity}
                                {
                                    item.active ?
                                    <BsCheckCircle className="text-green-500 font-bold"/>
                                    :
                                    <BsXCircle className="text-red-500 font-bold"/>
                                }
                            </button>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}
