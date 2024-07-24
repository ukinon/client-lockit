import Link from "next/link";
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { TbUserFilled } from "react-icons/tb";

export default function BottomNav() {
  return (
    <div className="flex flex-row z-[999999] items-center justify-between fixed bottom-5 h-[9dvh] rounded-3xl bg-orange-500 border w-[90%] max-w-[375px] left-5 md:left-[40%] px-10 ">
      <Link href={"/"}>
        <MdHomeFilled className="text-3xl text-white" />
      </Link>
      <Link href={"/location"}>
        <RiMapPin2Fill className="text-3xl text-white" />
      </Link>
      <Link href={"/profile"}>
        <TbUserFilled className="text-3xl text-white" />
      </Link>
    </div>
  );
}
