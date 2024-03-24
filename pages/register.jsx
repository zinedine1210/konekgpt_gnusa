import Link from "next/link";
import { useRouter } from "next/router";

export default function HalamanRegister() {
  const router = useRouter();
  const { token } = router.query;

  if (token)
    return (
      <section className="w-full h-screen bg-zinc-100">
        <div className="container mx-auto py-2 px-2 xl:px-32">
          <button className={`flex gap-1`}>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-3xl xl:text-4xl block text-lightPrimary">
                Konek
              </span>
            </div>
            <p className="self-end text-xs font-extrabold uppercase mb-1">
              Gpt
            </p>
          </button>
        </div>

        <div className="bg-white w-full xl:w-1/2 rounded-[40px] overflow-hidden shadow-2xl mx-auto mt-5 flex">
          <div
            style={{ backgroundImage: 'url("/images/jumbotron2.jpg")' }}
            className="hidden bg-cover w-1/2 xl:flex items-center justify-center"
          ></div>
          <div className="w-full xl:w-1/2 px-5 py-14">
            <h1 className="text-2xl font-bold">
              Daftar <span className="text-yellow-500">Gratis!</span>
            </h1>
            <p className="mt-2">
              Dan dapatkan banyak fitur untuk keperluan bisnis Anda
            </p>

            <form className="space-y-3 mt-5">
              <div>
                <label
                  htmlFor="name_company"
                  className="mb-1 inline-block text-sm"
                >
                  Nama Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-search w-full"
                  id="name_company"
                  placeholder="Masukan nama perusahaan Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 inline-block text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-search w-full"
                  id="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 inline-block text-sm">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input-search w-full"
                  id="phone"
                  placeholder="Contoh: 089508...."
                />
              </div>
              <div>
                <label
                  htmlFor="identitas_partner"
                  className="mb-1 inline-block text-sm"
                >
                  Identitas Partner
                </label>
                <input
                  type="text"
                  className="input-search w-full"
                  id="identitas_partner"
                  disabled
                  placeholder="Contoh: 089508...."
                  value={token}
                />
              </div>

              <div className="pt-5">
                <button className="btn-primary mx-auto">Daftar</button>
                <p className="text-center mt-3 text-zinc-500">
                  Sudah punya akun?{" "}
                  <Link href={"/"}>
                    <button className="text-blue-500 font-bold">Masuk</button>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    );

  return (
    <div>
      <h1>Token Not Found</h1>
    </div>
  );
}
