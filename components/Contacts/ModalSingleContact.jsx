import { MyContext } from "@/context/MyProvider";
import { useContext } from "react";
import { HiX } from "react-icons/hi";
import InputSelect from "../InputSelect";

export default function ModalSingleContact() {
  const context = useContext(MyContext)

  let options = [
    {value:"whatsapp", label:"Whatsapp"},
    {value:"telegram", label:"Telegram"},
    {value:"twitter", label:"Twitter"}
  ]

  return (
    <div className="fixed w-full h-screen bg-black backdrop-blur-md bg-opacity-40 overflow-y-auto left-0 top-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full md:w-1/4 mx-auto rounded-md p-5">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Add New Contact</h1>
            <button onClick={() => context.setData({...context, modal:null})}>
              <HiX />
            </button>
          </div>
          <form className="w-full relative mt-5 space-y-2">
            <div>
              <label htmlFor='namecontact' className='inline-block mb-1 text-sm'>Full Name <span className='text-red-500'>*</span></label>
              <input id='namecontact' type="text" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='Give a name to your new contact' />
            </div>
            <div>
              <label htmlFor='phonecontact' className='inline-block mb-1 text-sm'>Phone Number <span className='text-red-500'>*</span></label>
              <input id='phonecontact' type="text" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='' />
            </div>
            <div>
              <label htmlFor='emailcontact' className='inline-block mb-1 text-sm'>Email Address <span className='text-red-500'>*</span></label>
              <input id='emailcontact' type="email" className="w-full block bg-zinc-50 text-sm py-2 px-5 outline-none border-2 hover:bg-zinc-100 focus:bg-white focus:border-lightPrimary" placeholder='' />
            </div>
            <div>
              <label htmlFor='channelcontact' className='inline-block mb-1 text-sm'>Select Channel <span className='text-red-500'>*</span></label>
              <InputSelect options={options} defaultValue={"whatsapp"} handlerChange={value => console.log(value)}/>
            </div>
            <div className="flex items-center gap-2 pt-5">
                <button className="btn-primary" type="submit">Save</button>
                <button className="btn-secondary" type="button" onClick={() => context.setData({...context, modal:null})}>Cancel</button>
            </div>
          </form>
        </div>
    </div>
  )
}
