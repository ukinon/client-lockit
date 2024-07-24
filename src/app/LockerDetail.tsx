"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiChevronDown, BiKey, BiLock, BiNavigation } from "react-icons/bi";
import QRCode from "qrcode.react";
import { PiLockers, PiLockKey } from "react-icons/pi";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { listenToData } from "@/lib/firebaseRealtimeOperation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { getLocation } from "@/lib/location";

export type Data = {
  id?: number;
  lat: number;
  lon: number;
  name: string;
  pin: number;
  state: boolean;
  user_id: number;
};

export type LockerData = {
  [key: string]: Data;
};

export default function LockerDetail() {
  const [showQR, setShowQR] = React.useState(true);
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = React.useState(false);
  const [locker, setLocker] = React.useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<LockerData>();
  const [location, setLocation] = useState("");

  useEffect(() => {
    const unsubscribe = listenToData(
      ["boxes"],
      (data: LockerData | null) => {
        if (data) {
          setList(data);
        }
      },
      {
        orderBy: "user_id",
        equalTo: undefined,
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToData(
      ["boxes"],
      (data: LockerData | null) => {
        if (data) {
          setData(data[Object.keys(data)[0]] as Data);
        }
      },
      {
        orderBy: "user_id",
        equalTo: "1",
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getLoc() {
      if (data) {
        const response = await getLocation(
          data?.lat.toString(),
          data?.lon.toString()
        );
        setLocation(response);
      }
    }
    getLoc();
  }, [data]);

  console.log(location);

  function handleBook() {
    if (locker) {
      setIsLoading(true);
      setError(null);
      listenToData<Data>(["boxes", locker], (data) => {
        setIsLoading(false);
        if (data) {
          setData(data);
        } else {
          setError("Selected locker not found");
        }
      });
      setOpen(false);
    } else {
      setError("No locker selected");
    }
  }

  console.log(data);

  return (
    <>
      {data ? (
        <div
          className={`flex flex-row justify-between items-center gap-5 self-center rounded-xl border shadow-md w-full h-[10dvh] px-10 py-2 ${
            !data && "bg-orange-400 text-white"
          }`}
        >
          <h3 className="text-xl font-semibold">{data?.name}</h3>
          <PiLockers className="text-5xl text-orange-500" />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger>
            <>
              <Button
                className={`flex flex-row justify-between items-center gap-5 self-center rounded-xl border shadow-md w-full h-[10dvh] px-10 py-2 hover:bg-orange-400 ${
                  !data && "bg-orange-400 text-white"
                }`}
              >
                <h3 className="text-xl font-semibold">Sewa Loker</h3>
                <BiKey className="text-5xl" />{" "}
              </Button>
            </>
          </DialogTrigger>
          <DialogContent className="w-[85vw] rounded-lg h-[30dvh]">
            <DialogHeader>
              <DialogTitle className="text-xl">Pilih loker</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center p-3 w-full">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between bg-transparent border-orange-400 text-orange-400 focus:bg-transparent hover:bg-transparent border shadow-none w-full"
                  >
                    {locker && list
                      ? Object.entries(list as LockerData).find(
                          ([id, data]) => id === locker
                        )?.[1].name
                      : "Select framework..."}
                    <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] text-orange-400 p-0">
                  <Command className="w-full">
                    <CommandInput placeholder="Cari loker..." />
                    <CommandEmpty>Loker tidak ditemukan.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {list &&
                          Object.entries(list as LockerData)?.map(
                            ([id, data]) => (
                              <CommandItem
                                key={data.name}
                                value={data.name}
                                onSelect={() => {
                                  setLocker(id === locker ? "" : id);
                                  setOpen(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    locker === data.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {data.name}
                              </CommandItem>
                            )
                          )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <DialogFooter>
              <Button
                className="bg-orange-400 focus:bg-orange-400"
                onClick={() => handleBook()}
              >
                Sewa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {data && (
        <div className="flex flex-col gap-8 rounded-lg shadow-md border p-5">
          <h2 className="text-2xl font-bold">Detail Loker</h2>

          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">Lokasi</p>
            <div className="flex justify-between items-center">
              <p className="w-9/12 text-sm">{location}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiNavigation className="text-5xl bg-orange-400 rounded-full p-2 text-white" />
              </a>
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
                    value={`1-${data.id}-${data.pin}`}
                    size={256}
                    level={"H"}
                    includeMargin={true}
                  />
                ) : (
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={data.pin.toString()}
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
      )}
      {!data && (
        <div className="flex flex-col items-center justify-center h-[50dvh] gap-10">
          <BiLock className="text-8xl text-orange-400" />
          <h3 className="text-lg">Kamu belum menyewa loker</h3>
        </div>
      )}
    </>
  );
}
