import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaTelegramPlane } from "react-icons/fa";

export default function CardQuestion({ item }) {
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
                    <FaTelegramPlane className="text-sm"/>
                </div>
            </div>
            <h1 className="text-xs xl:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor labore voluptas aliquam quod ad nesciunt nemo ipsa dignissimos, eaque facilis?</h1>
        </div>
        <div className={`bg-white shadow-2xl rounded-md p-5 w-fit group-hover:delay-700 group-hover:visible invisible absolute z-20`}>
            <h1 className="text-sm text-zinc-500 uppercase dark:text-zinc-400">Detail Question</h1>
            <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, alias?</p>
        </div>
    </div>
  )
}
