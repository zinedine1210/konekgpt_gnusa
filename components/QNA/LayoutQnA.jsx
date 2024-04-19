import { MyContext } from "@/context/MyProvider";
import Layout from "../../components/Layouts/Layout";

export default function LayoutQnA({children}) {
  return (
    <Layout title="QNA" desc="HALAMAN UTAMA">
        <section className="w-full bg-zinc-100 relative h-screen">
          <div className="w-full border bg-white relative h-screen overflow-y-auto">
            {children}
          </div>
        </section>
    </Layout>
  )
}