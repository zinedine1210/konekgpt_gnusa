import SelectContact from "@/components/Contacts/SelectContact";
import SelectDownload from "@/components/Contacts/SelectDownload";
import TableContacts from "@/components/Contacts/TableContacts";
import Layout from "@/components/Layouts/Layout";
import { Suspense } from "react";

export default function HomeContact() {
  return (
    <Layout title="CONTACT" desc="HALAMAN UTAMA">
      <Suspense fallback={"Loading"}>
        <section className="w-full bg-zinc-100 relative h-screen">
            <div className="px-3 md:px-5 pt-16 h-full overflow-y-auto">
                <div className="p-0 md:p-5">
                  <label className="text-sm font-bold text-zinc-600 uppercase dark:text-zinc-400">Contacts</label>
                  {/* <p className="text-sm text-zinc-500 font-light max-w-xl"></p> */}

                  <div className="my-5">
                    <h1 className="text-sm font-bold text-zinc-600 mb-3">2 Contact</h1>
                    <div className="md:flex items-center justify-between">
                      <input type="search" className="input-search w-full md:w-auto md:w-fit" placeholder="Search" />
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <SelectContact />
                        <SelectDownload />
                      </div>
                    </div>
                    <div className="mt-5">
                      <TableContacts />
                    </div>
                  </div>
                </div>
            </div>
        </section>
      </Suspense>
    </Layout>
  )
}
