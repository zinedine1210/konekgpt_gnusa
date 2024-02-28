import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function InputSelect(props) {
    const dropRef = useRef(null)
    const [value, setValue] = useState(null)
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
    <div ref={dropRef} className={`relative bg-zinc-50 py-2 px-4 outline-none border-2 w-full ${open ? "border-lightPrimary bg-white":"hover:bg-zinc-100"}`}>
        <div onClick={() => setOpen(!open)} className="flex items-center justify-between cursor-pointer">
            <h1 className="text-sm mr-5">{props.defaultValue ? props.defaultValue : value ? value : "Select"}</h1>
            <FaChevronDown className={`${open ? "rotate-180":""} transition-transform duration-300 text-zinc-500 text-xs`}/>
        </div>

        <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 overflow-y-auto shadow-md z-20 w-full transition-all duration-300 absolute bg-white top-full left-0 mt-1`}>
            {
                props.options.map((option, key) => {
                    return <button type="button" disabled={option.value == props.value ? true:false} onClick={() => props.handlerChange(option.value)} key={key} className="disabled:bg-blue-100 py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">{option.label}</button>
                })
            }
        </div>
    </div>
  )
}
