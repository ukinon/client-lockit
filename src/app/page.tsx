import { PiHandWaving } from "react-icons/pi";
import LockerDetail from "./LockerDetail";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Halo,</h1>
          <h1 className="text-2xl font-semibold">Arfiano Jordhy</h1>
        </div>

        <PiHandWaving className="text-6xl text-orange-400" />
      </div>

      <LockerDetail />
    </div>
  );
}
