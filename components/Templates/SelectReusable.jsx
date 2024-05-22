import { useEffect, useRef, useState } from "react";

export default function SelectReusable({ customCss="btn-primary inline-block", options, customAction, label="Label" }) {
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
    <div ref={dropRef} className="relative">
        <button onClick={() => setOpen(!open)} className={customCss}>
            {label}
        </button>
        <div className={`${open ? "visible translate-y-0 opacity-100":"opacity-0 invisible translate-y-5"} max-h-52 min-w-56 overflow-y-auto shadow-md z-20 w-full transition-all duration-300 absolute backdrop-blur-md top-full left-0 mt-1`}>
            {
                options && options.map((opt, index) => {
                    return (
                        <button id={index} onClick={() => customAction ? customAction() : opt.onClick()} className="py-2 px-4 w-full block text-start text-sm transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-blue-500">
                            {opt.label}
                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}
