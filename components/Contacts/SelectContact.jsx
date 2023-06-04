import { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import ModalSingleContact from "./ModalSingleContact";
import { MyContext } from "@/context/MyProvider";

export default function SelectContact() {
    const dropRef = useRef(null)
    const [modal, setModal] = useState(false)
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


  return (
    <div>
        <div ref={dropRef} className={`relative`}>
            <button className="btn-primary" onClick={() => setOpen(!open)}>
                <FaUser />
                New Contact
                <FaChevronDown className={`${open ? "rotate-180":""} text-xs transition-all duration-300 ease-in-out`}/>
            </button>

            <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 overflow-y-auto shadow-md z-20 w-56 transition-all duration-300 absolute backdrop-blur-md top-full left-0 md:right-0 mt-1`}>
                <button className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100" onClick={() => context.setData({...context, modal:"singlecontact"})}>Single Contact</button>
                <button className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100">Upload Multiple Contact</button>
            </div>
        </div>
        {
            context.modal ?
            context.modal == "singlecontact" ?
                <ModalSingleContact />
            :""
            :""
        }
    </div>
  )
}

