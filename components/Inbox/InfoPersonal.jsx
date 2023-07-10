import { MyContext } from "@/context/MyProvider"
import { useContext } from "react"
import { HiX } from "react-icons/hi"

export default function InfoPersonal() {
    const context = useContext(MyContext)
    const data = context.detailContact

  return (
    <div className="pt-16">
        <div className="flex items-center gap-5 px-3 pb-2 shadow-md">
            <button onClick={() => context.setData({...context, detailContact:null})}>
                <HiX />
            </button>
            <h1 className="text-black">Info Kontak</h1>
        </div>

        <div className="px-3 text-center py-5">
            <div className="flex items-center justify-center w-32 h-32 rounded-full mx-auto bg-blue-100 text-blue-500 text-5xl font-bold uppercase">
                Z
            </div>
            <h1 className="mt-2 text-zinc-600 font-bold">{data.data.pushName ?? "No Name"}</h1>
            <p className="text-sm text-zinc-500">+{data.data.id.split("@")[0]}</p>
        </div>
        <div className="border-t py-2 px-3">
            <h1 className="text-sm text-zinc-500">Shared Documents</h1>
            <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
                <div className="bg-zinc-500 w-full h-10 rounded-md"></div>
            </div>
        </div>
    </div>
  )
}
