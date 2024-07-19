"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiNavigation } from "react-icons/bi";
import QRCode from "qrcode.react";
import { PiLockers } from "react-icons/pi";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function LockerDetail() {
  const [showQR, setShowQR] = React.useState(true);
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-5 self-center rounded-xl border shadow-md w-full h-[10dvh] px-10 py-2">
        <h3 className="text-xl font-semibold">Loker A</h3>
        <PiLockers className="text-5xl text-orange-500" />
      </div>

      <div className="flex flex-col gap-8 rounded-lg shadow-md border p-5">
        <h2 className="text-2xl font-bold">Detail Loker</h2>

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold">Lokasi</p>
          <div className="flex justify-between items-center">
            <p className="w-9/12 text-sm">
              Jl. Pemuda pemudi yang dianugerahi Tuhan
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=-6.175110,106.865036"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiNavigation className="text-5xl bg-orange-400 rounded-full p-2 text-white" />
            </a>
          </div>
          <p className="text-base font-semibold">Waktu mulai peminjaman</p>
          <div className="flex justify-between items-center">
            <div className=" text-orange-500 text-xl">
              <p>01:00</p>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-400">Lihat kode</Button>
          </DialogTrigger>
          <DialogContent className="w-[85vw] rounded-lg h-[60dvh]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {showQR ? "Kode QR" : "Kode pin"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center p-3">
              {showQR ? (
                <QRCode
                  value="https://example.com"
                  size={256}
                  level={"H"}
                  includeMargin={true}
                />
              ) : (
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value="123456"
                  disabled
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={0}
                    />
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={1}
                    />
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={2}
                    />
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={3}
                    />
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={4}
                    />
                    <InputOTPSlot
                      className="text-3xl text-orange-500 font-semibold border-black/75 h-11 w-11"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              )}
            </div>
            <DialogFooter>
              <Button
                className="bg-orange-400 focus:bg-orange-400"
                onClick={() => setShowQR(!showQR)}
              >
                {showQR ? "Lihat pin" : "Lihat QR"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
