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
      Create Attachment
      <FaChevronDown className={`${open ? "rotate-180":""} transition-transform duration-300 text-xs`}/>
    </button>

    <div className={`${open ? "visible opacity-100":"opacity-0 invisible"} transition-all duration-300 bg-white z-20 rounded-md shadow-md w-full xl:w-[850px] absolute top-full right-0 mt-1 px-5 py-3`}>
      <h1 className="text-zinc-600 font-bold">Create New Attchment</h1>
      <p className="text-zinc-500 font-light text-xs">Build your bot story from scratch or get started right away by importing a pre-build, task-specific template.</p>
      <div className="gap-2 mt-3 grid grid-cols-1 xl:grid-cols-2">
        <Link href={"/usr/knowledge/attachment/create_v2/website?m=clm_knowledge_attachment"}>
          <button className="text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
            <TfiWorld className="text-green-500 text-4xl mb-2"/>
            <h1 className="text-sm font-bold">Build From Website</h1>
            <p className="text-xs font-light">Create your story from your website url.</p>
          </button>
        </Link>
        <Link href={"/usr/knowledge/attachment/create_v2/upload-file?m=clm_knowledge_attachment"}>
          <button className="text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
            <BsFilePdfFill className="text-red-500 text-4xl mb-2"/>
            <h1 className="text-sm font-bold">Build From Upload File</h1>
            <p className="text-xs font-light">Create your business logic just upload your file.</p>
          </button>
        </Link>
        {/* <Link href={"/usr/knowledge/attachment/create_v2/scratch?m=clm_knowledge_attachment"}> */}
          <button disabled className="disabled:bg-zinc-200 disabled:relative disabled:cursor-not-allowed text-start w-full block p-3 border border-zinc-200 rounded-md hover:border-blue-500">
            <FaFileWord className="text-blue-500 text-4xl mb-2"/>
            <span className="absolute block top-2 right-2 text-red-500 font-bold uppercase">Off</span>
            <h1 className="text-sm font-bold">Build From Scratch</h1>
            <p className="text-xs font-light">Create your story from A to Z using ChatBot Visual Builder.</p>
          </button>
        {/* </Link> */}
      </div>
    </div>
  </div>
)
}
