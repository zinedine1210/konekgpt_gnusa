import Link from "next/link";

export default function HelpButton() {
  return (
    <Link href={"/usr/help"}>
        <button className="fixed top-1/2 -translate-y-1/2 text-xs right-0 bg-lightPrimary text-white font-bold md:text-sm z-20 rounded-l-md pl-2 md:pl-3 pr-4 md:pr-6 py-2 md:py-3 transition-transform duration-300 ease-in-out hover:translate-x-0 translate-x-3">
            <p>H</p>
            <p>E</p>
            <p>L</p>
            <p>P</p>
        </button>
    </Link>
  )
}
