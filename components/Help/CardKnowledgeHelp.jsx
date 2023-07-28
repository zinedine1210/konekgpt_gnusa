import { MyContext } from "@/context/MyProvider"
import { useContext, useState } from "react"
import { HiX } from "react-icons/hi"

export default function CardKnowledgeHelp({item}) {
    const context = useContext(MyContext)
    const [open, setOpen] = useState(false)

  return (
    <>
        <div className="bg-white rounded-md shadow-md p-3 w-full">
            <h1 className="text-zinc-600">{item.name}</h1>
            <p className="text-xs text-zinc-500">{item.id}</p>
            <button onClick={() => setOpen(true)} className="btn-primary mt-2">
                Select
            </button>
        </div>

        {
            open && (
                <div className="fixed w-full h-screen bg-black backdrop-blur-md bg-opacity-40 overflow-y-auto left-0 top-0 z-50 flex items-center justify-center">
                    <div className="bg-white w-full md:w-2/5 mx-auto rounded-md p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-bold">Help Knowledge Feature</h1>
                                <p className="text-sm text-zinc-500">{item.name}</p>
                            </div>
                            <button onClick={() => setOpen(false)}>
                                <HiX />
                            </button>
                        </div>
                        <div className="mt-5 space-y-2">
                            <div>
                                <h1 className="text-sm">Id Knowledge</h1>
                                <p className="text-xs text-zinc-500">{item.id}</p>
                            </div>
                            <div>
                                <h1 className="text-sm">Type Training</h1>
                                {item.type_training == 1 && <span className="bg-lime-100 text-lime-500 font-bold text-xs rounded-md uppercase py-1 px-3">Upload</span>}
                                {item.type_training == 2 && <span className="bg-indigo-100 text-indigo-500 font-bold text-xs rounded-md uppercase py-1 px-3">Url</span>}
                                {item.type_training == 4 && <span className="bg-teal-100 text-teal-500 font-bold text-xs rounded-md uppercase py-1 px-3">Scratch</span>}
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-xl mt-5">What's wrong with this knowledge?</h1>
                                <div>
                                    <input type="checkbox" id="react-option" value="" class="hidden peer" required="" />
                                    <label for="react-option" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-50">                           
                                        <h1 className="text-sm">Lorem ipsum dolor, sit amet</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="react-option2" value="" class="hidden peer" required="" />
                                    <label for="react-option2" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-50">                           
                                        <h1 className="text-sm">Lorem ipsum dolor, sit amet</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="react-option3" value="" class="hidden peer" required="" />
                                    <label for="react-option3" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-50">                           
                                        <h1 className="text-sm">Lorem ipsum dolor, sit amet</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="react-option4" value="" class="hidden peer" required="" />
                                    <label for="react-option4" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-50">                           
                                        <h1 className="text-sm">Lorem ipsum dolor, sit amet</h1>
                                    </label>
                                </div>
                                <div>
                                    <input type="checkbox" id="react-option5" value="" class="hidden peer" required="" />
                                    <label for="react-option5" class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-50">                           
                                        <h1 className="text-sm">Lorem ipsum dolor, sit amet</h1>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="btn-primary mt-5">Submit</button>
                    </div>
                </div>
            )
        }
    </>
  )
}
