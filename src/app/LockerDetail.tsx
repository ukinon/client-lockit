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
import {
  BiChevronDown,
  BiCurrentLocation,
  BiKey,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { getLocation } from "@/lib/location";
import { Skeleton } from "@/components/ui/skeleton";
import { MdLocationPin } from "react-icons/md";
import { TbLocationPin } from "react-icons/tb";

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
  const [showQR, setShowQR] = useState(true);
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState(false);
  const [locker, setLocker] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<LockerData>();
  const [location, setLocation] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = listenToData(
      ["boxes"],
      (data: LockerData | null) => {
        if (data) {
          setList(data);
        }
        setIsLoading(false);
      },
      {
        orderBy: "user_id",
        equalTo: "",
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (list) {
      setIsLoading(true);
      const unsubscribe = listenToData(
        ["boxes"],
        (data: LockerData | null) => {
          if (data) {
            setData(data[Object.keys(data)[0]] as Data);
          }
          setIsLoading(false);
        },
        {
          orderBy: "user_id",
          equalTo: "1",
        }
      );
      return () => unsubscribe();
    }
  }, [list]);

  useEffect(() => {
    async function getLoc() {
      if (data) {
        setIsLoading(true);
        try {
          const response = await getLocation(
            data?.lat.toString(),
            data?.lon.toString()
          );
          setLocation(response);
        } catch (error) {
          console.error("Error fetching location:", error);
          setError("Failed to fetch location");
        } finally {
          setIsLoading(false);
        }
      }
    }
    getLoc();
  }, [data]);

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

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-[9999999999999999999999999]">
        <div className="relative w-screen h-screen overflow-hidden">
          <div className="flex items-center justify-center h-screen space-x-2 bg-white dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

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
            <Button
              className={`flex flex-row justify-between items-center gap-5 self-center rounded-xl border shadow-md w-full h-[10dvh] px-10 py-2 hover:bg-orange-400 ${
                !data && "bg-orange-400 text-white"
              }`}
            >
              <h3 className="text-xl font-semibold">Sewa Loker</h3>
              <BiKey className="text-5xl" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[85vw] rounded-lg h-[30dvh]">
            <DialogHeader>
              <DialogTitle className="text-xl">Pilih loker</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center p-3 w-full">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full border-orange-400 border justify-between"
                  >
                    {locker && list
                      ? Object.entries(list).find(
                          ([id, data]) => id === locker
                        )?.[1].name
                      : "Pilih loker..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-[999999999999999999999999999999999999999999]">
                  <Command className="z-[9999999999999999999999999999]">
                    <CommandInput placeholder="Cari loker..." className="h-9" />
                    <CommandEmpty>Loker tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {list &&
                          Object.entries(list).map(([id, data]) => (
                            <CommandItem
                              key={id}
                              value={data.name}
                              onSelect={() => {
                                setLocker(id === locker ? "" : id);
                                setOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  locker === id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {data.name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </CommandGroup>
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
            <div className="flex flex-row gap-2 items-center">
              <BiCurrentLocation className="text-xl" />
              <p className="text-base font-semibold">Lokasi</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="w-9/12 text-sm">
                {location || <Skeleton className="w-40 bg-zinc-300" />}
              </p>
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
                  <p className="text-5xl font-semibold text-orange-400">{`1-${data.id}-${data.pin}`}</p>
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
      {!data && !isLoading && (
        <div className="flex flex-col items-center justify-center h-[50dvh] gap-10">
          <BiLock className="text-8xl text-orange-400" />
          <h3 className="text-lg">Kamu belum menyewa loker</h3>
        </div>
      )}
    </>
  );
}
