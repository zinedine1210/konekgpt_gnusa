import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function CardQuestion({ item }) {
    console.log(item)
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
    <div className="relative group hover:bg-blue-50">
        <div className={`xl:flex items-center p-2 gap-2`}>
            <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex items-center justify-center text-white bg-blue-500 w-6 h-6 rounded-full">
                    <FaWhatsapp className="text-sm"/>
                </div>
            </div>
            <h1 className="text-xs xl:text-sm">{item.msg}</h1>
        </div>
        <div className={`bg-white shadow-2xl rounded-md p-5 w-fit group-hover:delay-700 group-hover:visible invisible absolute z-20`}>
            <h1 className="text-sm text-zinc-500 uppercase dark:text-zinc-400">Detail Question</h1>
            <p className="text-sm mt-2">{item.msg}</p>
        </div>
    </div>
  )
}
