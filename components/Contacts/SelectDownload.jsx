import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaDownload, FaUser } from "react-icons/fa";

export default function SelectDownload() {
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
    <div ref={dropRef} className={`relative`}>
        <button className="btn-secondary" onClick={() => setOpen(!open)}>
            <FaDownload />
            Download
            <FaChevronDown className={`${open ? "rotate-180":""} text-xs transition-all duration-300 ease-in-out`}/>
        </button>

        <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 overflow-y-auto shadow-md z-20 w-56 transition-all duration-300 absolute backdrop-blur-md top-full right-0 mt-1`}>
            <button className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">Download Selected</button>
            <button className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">Download All</button>
        </div>
    </div>
  )
}
