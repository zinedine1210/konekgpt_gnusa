import { FaTelegram } from "react-icons/fa"

export default function ContactInbox() {
  return (
    <div className="w-full bg-zinc-100 dark:bg-dark relative h-screen p-2 md:p-10">
        <h1 className="text-xl font-bold">Contact</h1>
        <p className="font-light text-sm">Contact you save</p>

        <div className="mt-5 bg-white dark:bg-darkPrimary rounded-md shadow-md w-full xl:w-1/2 p-5 space-y-5">
            {
                new Array(5).fill("coba").map(load => {
                    return (
                        <div key={load} className="flex items-center gap-2">
                            <span className="flex items-center justify-center text-center bg-yellow-500 text-white font-bold text-xl rounded-full w-12 h-12">X</span>
                            <div>
                                <h1 className="font-bold">Zinedine Ziddan</h1>
                                <p className="text-sm">ziddangnusa@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span><FaTelegram className="text-blue-500 text-2xl"/></span>
                                <span></span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
