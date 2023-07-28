import Seo from "../Seo"
import HelpButton from "../Templates/HelpButton"
import Navbar from "../Templates/Navbar"
import Sidebar from "../Templates/Sidebar"

export default function Layout({children, title, desc, image}) {
  return (
    <>
      <Seo 
        title={title}
        description={desc}
        image={image ? image:null}
      />

      <section className="max-h-screen w-full">
        <Navbar />
        <div className="w-full flex">
          <HelpButton />
          <Sidebar />
          {children}
        </div>
      </section>
    </>
  )
}
