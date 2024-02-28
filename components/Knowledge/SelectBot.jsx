import { MyContext } from "@/context/MyProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function SelectBot({ setName }) {
    const dropRef = useRef(null)
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)

    const context = useContext(MyContext)

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


    const handlerChoose = (key) => {
        setName(context.dataKnowledge[key])
        setData(context.dataKnowledge[key])
    }

  return (
    <div ref={dropRef} className={`relative bg-zinc-50 py-2 px-4 outline-none border-2 w-56 ${open ? "border-lightPrimary bg-white":"hover:bg-zinc-100"}`}>
        <div onClick={() => setOpen(!open)} className="flex items-center justify-between cursor-pointer">
            <h1 className="text-sm mr-5">{data ? data.name : "Select Bot"}</h1>
            <FaChevronDown className={`${open ? "rotate-180":""} transition-transform duration-300 text-zinc-500 text-xs`}/>
        </div>

        <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 overflow-y-auto shadow-md z-20 w-full transition-all duration-300 absolute backdrop-blur-md top-full left-0 mt-1`}>
            {
                context.dataKnowledge ?
                context.dataKnowledge.length > 0 ?
                context.dataKnowledge.map((item, key) => {
                    return (
                        <button key={key} onClick={() => handlerChoose(key)} className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">{item.name}</button>
                    )
                })
                :
                <h1 className="text-red-500 text-sm p-2 text-center">No Knowledge Found</h1>
                :""
            }
        </div>
    </div>
  )
}
