import { useContext, useEffect, useState } from "react"
import Seo from "../Seo"
import HelpButton from "../Templates/HelpButton"
import Navbar from "../Templates/Navbar"
import Sidebar from "../Sidebar/Sidebar1"
import { MyContext } from "@/context/MyProvider"
import SubMenu from "../Sidebar/SubMenu"
import LayoutSidebar from "../Sidebar/LayoutSidebar"
import { useRouter } from "next/router"
import PageChange from "./PageChange"
import AuthRepository from "@/repositories/AuthRepository"
import Swal from "sweetalert2"
import Loading from "../Loading"

export default function Layout({children, title, desc, image}) {
  const context = useContext(MyContext)
  const view = context.view;
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [routeNow, setRouteNow] = useState("");
  const [mounted, setMounted] = useState(null)
  const router = useRouter()
  const [status, setStatus] = useState("")
  const [auth, setAuth] = useState(null)

  const getStatus = async (xa) => {
    const result = await AuthRepository.getStatus({XA:xa, param:"user"})
    console.log("result auth", result);
    if(result?.status == -1 && result?.message == "Token Expired"){
      localStorage.clear()
      Swal.fire({
        icon:"info",
        title:"Logout",
        text:"Your session has expired",
        timer:1200
      })
      router.push("/")
      localStorage.setItem("auth", JSON.stringify({ status:"logout" }))
      setMounted(true)
    }else if(result?.status == -1){
      Swal.fire({
        icon:"warning",
        title:"Maintenance"
      })
      router.push("/")
      localStorage.clear()
      localStorage.setItem("auth", JSON.stringify({ status:"maintenance" }))
    }else{
      setAuth(result)
      localStorage.setItem("auth", JSON.stringify({ status:"authentication", data:result }))
      setStatus("Welcome to page")
      setMounted(true)
    }
  }

  useEffect(() => {
    // cek kondisi
    const getxa = JSON.parse(localStorage.getItem("XA"))
    const authData = JSON.parse(localStorage.getItem("auth"))

    if(getxa){
      console.log(authData);
      if(!authData || authData.status !== "authentication"){
        setStatus("we're getting your account, hold on...")
        getStatus(getxa)
      }else{
        setMounted(true)
      }
    }else{
      localStorage.clear()
      router.push("/")
    }
  }, []);


  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      console.log(`Loading: ${url}`);
      setRouteNow(router.asPath)

      if (url !== router.asPath) {
        setIsPageChanging(true);
      }
    };

    const handleRouteChangeComplete = () => {
      setIsPageChanging(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  
  useEffect(() => {
    // pengaturan view
    const getView = localStorage.getItem("view")
    // console.log("layout - setting view to", getView);

    if(!view){
      if(getView){
        const getMinimize = JSON.parse(localStorage.getItem("minimize"))
        console.log("layout - already has view", getView, getMinimize);
        context.setData({...context, view:getView, minimize:getMinimize})
      }else{
        localStorage.setItem("view", 1)
        localStorage.setItem("minimize", false)
        context.setData({...context, view:1, minimize:false})
      }
    }
  }, [view])


  return (
    <>
      <>
        <Seo 
          title={title}
          description={desc}
          image={image ? image:null}
        />

        {
          mounted && JSON.parse(localStorage.getItem("auth"))?.status == "authentication"?
            <section style={{backgroundImage:"url('/images/bodyMain.jpg')"}} className="bg-center bg-cover w-screen flex items-center justify-center h-screen">
              <content className="w-full h-full max-h-[1080px] max-w-[1920px] overflow-hidden relative md:rounded-2xl shadow-md">
                <Navbar />
                <HelpButton />
                <div className="overflow-x-hidden relative flex">
                  <LayoutSidebar />
                  <section className="relative w-full overflow-y-auto h-screen max-h-[1080px] max-w-[1920px] bg-zinc-100">
                    {isPageChanging ? <PageChange />:children}
                  </section>
                </div>
              </content>
            </section>
          :<Loading status={status}/>
        }
      </>
    </>
  )
}

