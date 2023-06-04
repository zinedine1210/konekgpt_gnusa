import Link from "next/link";
import { FaEdit, FaTelegram, FaTelegramPlane } from "react-icons/fa";

export default function CardContacts() {
  return (
    <tr>
        <td className="px-4 py-4 text-sm font-medium text-zinc-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
                <div className="flex items-center gap-x-5">
                    <input type="checkbox" />
                    <div className="flex items-center gap-2">
                        <span className="bg-yellow-500 flex items-center justify-center text-white font-bold w-8 h-8 rounded-full">Zz</span>
                        <h2 className="font-normal text-zinc-800 dark:text-white">Zinedine Ziddan Fahdlevy</h2>
                        {/* <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">20 Pages</p> */}
                    </div>
                </div>
            </div>
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">ziddanfhdlvy12@gmail.com</td>

        <td className="px-5 py-4 text-sm font-normal text-zinc-700 whitespace-nowrap">
            <span className="flex items-center justify-center text-white bg-blue-500 w-10 h-10 rounded-full text-xl"><FaTelegramPlane /></span>
        </td>
        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Jan 4, 2022</td>
        {/* <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-nowrap">Scratch</td> */}
        <td className="px-4 py-4flex items-center gap-2">
            <Link href={`/usr/contacts/zinedine`}>
                <button className="flex items-center justify-center hover:bg-gray-100 w-8 rounded-md h-8">
                    <FaEdit className="text-gray-500"/>
                </button>
            </Link>
        </td>
    </tr>
  )
}
