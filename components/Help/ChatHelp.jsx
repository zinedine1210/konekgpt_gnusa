import {HiOutlineArrowSmRight} from "react-icons/hi"
import { useContext, useState } from "react";
import { MyContext } from "@/context/MyProvider";

export default function ChatHelp() {
    const [data, setData] = useState(null)
    const context = useContext(MyContext)

    const handlerChange = value => {
        setData(value)
    }
    

    if(context.modal && context.modal == "chatHelp")
  return (
    <div className="fixed top-0 left-0 z-50 md:block w-full md:w-[500px] h-screen md:h-[840px] md:border-8 border-black md:z-0 md:rounded-[50px] bg-white dark:bg-dark dark:border-black px-2 mx-auto outline outline-blue-300 shadow-2xl pb-16 md:relative">
        <button className="text-center text-sm text-red-500 w-full py-1" onClick={() => context.setData({...context, modal:null, view:2})}>Tutup Simulasi</button>
        <div className="h-full overflow-y-hidden hover:overflow-y-auto">
            <div className="space-y-2 w-full mx-auto">
                <div className="flex gap-2">
                    <div className="ml-auto">
                        <h1 className="text-end text-zinc-500 text-xs py-1">You</h1>
                        <div className="space-y-2">
                        <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] ml-auto relative">
                            <h1 className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing Coba.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit backdrop-blur-2xl pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] ml-auto relative">
                            <h1 className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio saepe libero amet ipsum magni ullam? In odit voluptatibus vero nobis.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Y</span>
                </div>
                <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                    <div>
                        <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                        <div className="space-y-2">
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                    <div>
                        <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                        <div className="space-y-2">
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                    <div>
                        <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                        <div className="space-y-2">
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                    <div>
                        <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                        <div className="space-y-2">
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold border-2 border-white">Z</span>
                    <div>
                        <h1 className="text-zinc-500 text-xs py-1">Zinedine Ziddan...</h1>
                        <div className="space-y-2">
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi reprehenderit ipsam dolorem ex cumque rerum illum ut assumenda consequatur eos, hic veniam non soluta quaerat, voluptates error. Quam, asperiores.</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        <div className="w-fit bg-white pt-1 pb-6 px-1 shadow-md rounded-md max-w-[300px] relative">
                            <h1 className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quasi</h1>
                            <span className="absolute bottom-1 right-1 text-xs font-light text-zinc-500">11.00</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute right-1/2 translate-x-1/2 w-full px-5 bottom-0 overflow-hidden rounded-xl">
            <form onSubmit={(e) => handlerSubmit(e)} className="relative">
                <input id="inputQuestion" type="text" className="outline-none peer p-2 w-full text-xs border-2 border-blue-200 rounded-xl placeholder:text-zinc-500 pr-10 pl-5 bg-zinc-200 focus:bg-white transition-all duration-300" placeholder="Any Question?" maxLength={50} onChange={(e) => handlerChange(e.target.value)} />
                <button type="submit" className="absolute peer-focus:translate-x-0 -translate-x-5 opacity-0 peer-focus:opacity-100 hover:scale-125 transition-all duration-300 top-1/2 -translate-y-1/2 right-2 w-8 h-8 flex items-center justify-center peer-focus:visible invisible">
                <HiOutlineArrowSmRight className="text-xl"/>
                </button>
            </form>
            <h1 className="text-end text-zinc-500 text-xs p-1">{data ? data.length :"0"}/50</h1>
        </div>
    </div>
  )
}
