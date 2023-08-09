import Link from "next/link";
import { useRouter } from "next/router";

export default function HelpButton() {
  const router = useRouter()

  const handlerSave = () => {
    // console.log(router.asPath);
    const aspath = router.asPath

    if(!aspath.includes("/usr/help")){
      localStorage.setItem("lastpage", aspath)
    }
  }
  return (
    <Link href={"/usr/help"}>
        <button onClick={() => handlerSave()} className="fixed top-1/2 -translate-y-1/2 text-xs right-0 bg-lightPrimary text-white font-bold md:text-sm z-20 rounded-l-md pl-2 md:pl-3 pr-4 md:pr-6 py-2 md:py-3 transition-transform duration-300 ease-in-out hover:translate-x-0 translate-x-3">
            <p>H</p>
            <p>E</p>
            <p>L</p>
            <p>P</p>
        </button>
    </Link>
  )
}
