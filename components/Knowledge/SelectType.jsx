import { useEffect, useRef, useState } from "react";
import { BsFilePdfFill, BsPlusCircleDotted } from "react-icons/bs";
import {TfiWorld} from "react-icons/tfi"
import { FaChevronDown, FaFileWord } from "react-icons/fa";
import Link from "next/link";

export default function SelectType() {
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
    <button className="btn-primary" onClick={() => setOpen(!open)}>
      <BsPlusCircleDotted className="font-bold text-xl"/>
      Training Bot
      <FaChevronDown className={`${open ? "rotate-180":""} transition-transform duration-300 text-xs`}/>
    </button>

    <div className={`${open ? "visible":"invisible"} bg-white z-20 rounded-md shadow-md w-full md:w-[900px] absolute top-full right-0 mt-1 px-5 py-3`}>
      <h1 className="text-zinc-600 font-bold">Create New Bot</h1>
      <p className="text-zinc-500 font-light text-xs">Build your bot story from scratch or get started right away by importing a pre-build, task-specific template.</p>
      <div className="gap-2 mt-3 grid grid-cols-1 md:grid-cols-2">
        <Link href={"/usr/knowledge/create/scratch"}>
          <button className="text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
            <FaFileWord className="text-blue-500 text-4xl mb-2"/>
            <h1 className="text-sm font-bold">Build From Scratch</h1>
            <p className="text-xs font-light">Create your story from A to Z using ChatBot Visual Builder.</p>
          </button>
        </Link>
        <Link href={"/usr/knowledge/create/website"}>
          <button className="text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
            <TfiWorld className="text-green-500 text-4xl mb-2"/>
            <h1 className="text-sm font-bold">Build From Website</h1>
            <p className="text-xs font-light">Create your story from A to Z using ChatBot Visual Builder.</p>
          </button>
        </Link>
        <button className="text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
          <BsFilePdfFill className="text-red-500 text-4xl mb-2"/>
          <h1 className="text-sm font-bold">Build From PDF</h1>
          <p className="text-xs font-light">Create your story from A to Z using ChatBot Visual Builder.</p>
        </button>
      </div>
    </div>
  </div>
)
}
