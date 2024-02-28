import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";
import { FaCopy, FaDownload, FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { IoText } from "react-icons/io5";

export default function ModalImport() {
  const context = useContext(MyContext)

  return (
    <div className="fixed w-full h-screen bg-black backdrop-blur-md bg-opacity-40 overflow-y-auto left-0 top-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full xl:w-2/5 mx-auto rounded-md p-5">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Download to</h1>
            <button onClick={() => context.setData({...context, modal:null})}>
              <HiX />
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 mt-5">
            <button className="group relative w-full rounded-md bg-gradient-to-br from-zinc-800 via-zinc-500 to-zinc-300 p-5 text-start">
                <IoText className="text-white text-3xl mb-2"/>
                <h1 className="text-white font-bold">Copy Text Line</h1>
                <span className="group-hover:visible invisible transition-all duration-300 ease-in-out opacity-0 absolute inline-block right-5 top-1/2 -translate-y-1/2 text-white group-hover:opacity-50 text-6xl"><FaCopy /></span>
            </button>
            <button className="group relative w-full rounded-md bg-gradient-to-br from-red-800 via-red-500 to-red-300 p-5 text-start">
                <FaFilePdf className="text-white text-3xl mb-2"/>
                <h1 className="text-white font-bold">Download PDF</h1>
                <span className="group-hover:visible invisible transition-all duration-300 ease-in-out opacity-0 absolute inline-block right-5 top-1/2 -translate-y-1/2 text-white group-hover:opacity-50 text-6xl"><FaDownload /></span>
            </button>
            <button className="group relative w-full rounded-md bg-gradient-to-br from-blue-800 via-blue-500 to-blue-300 p-5 text-start">
                <FaFileCsv className="text-white text-3xl mb-2"/>
                <h1 className="text-white font-bold">Download CSV</h1>
                <span className="group-hover:visible invisible transition-all duration-300 ease-in-out opacity-0 absolute inline-block right-5 top-1/2 -translate-y-1/2 text-white group-hover:opacity-50 text-6xl"><FaDownload /></span>
            </button>
            <button className="group relative w-full rounded-md bg-gradient-to-br from-green-800 via-green-500 to-green-300 p-5 text-start">
                <FaFileExcel className="text-white text-3xl mb-2"/>
                <h1 className="text-white font-bold">Download Excel</h1>
                <span className="group-hover:visible invisible transition-all duration-300 ease-in-out opacity-0 absolute inline-block right-5 top-1/2 -translate-y-1/2 text-white group-hover:opacity-50 text-6xl"><FaDownload /></span>
            </button>
          </div>
        </div>
    </div>
  )
}
