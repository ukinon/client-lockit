import { FaHandMiddleFinger } from "react-icons/fa";
import { PiHandHeart, PiHandWaving, PiLockers } from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Hello,</h1>
          <h1 className="text-2xl font-semibold">Arfiano Jordhy</h1>
        </div>

        <PiHandWaving className="text-6xl text-orange-400" />
      </div>

      <div className="flex flex-row justify-between items-center gap-5 self-center rounded-xl border shadow-md w-full h-[10dvh] px-10 py-2">
        <h3 className="text-xl">Sewa Loker</h3>
        <PiLockers className="text-5xl text-orange-500" />
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">Loker Aktif</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between w-full text-sm">
            <p>Loker A</p>
            <p>5 Menit</p>
            <button className="text-orange-500 underline font-semibold">
              Lihat Kode
            </button>
          </div>
          <div className="flex flex-row justify-between w-full text-sm">
            <p>Loker B</p>
            <p>10 Menit</p>
            <button className="text-orange-500 underline font-semibold">
              Lihat Kode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
