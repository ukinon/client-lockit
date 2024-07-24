import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { BiLock, BiLogOut, BiPencil } from "react-icons/bi";

export default function page() {
  return (
    <div className=" flex flex-col gap-5 items-center justify-start mt-16">
      <div className="flex flex-col items-center gap-5 border shadow-lg rounded-xl bg-orange-100 p-3 text-black font-bold">
        <Avatar className="w-1/3 h-1/3">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>Arfiano Jordhy Ramadhan</h1>
      </div>

      <div className="p-3 flex items-center justify-center gap-2 text-black rounded-xl border-2 w-full">
        <BiPencil />
        <p>Ubah Profil</p>
      </div>
      <div className="p-3 flex items-center justify-center gap-2 text-black rounded-xl border-2 w-full">
        <BiLock />
        <p>Ubah Password</p>
      </div>
      <div className="p-3 flex items-center gap-2 text-red-500">
        <BiLogOut />
        <p>Keluar</p>
      </div>
    </div>
  );
}
