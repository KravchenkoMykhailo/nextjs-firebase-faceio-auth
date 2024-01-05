"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { SiFirebase } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/message/useToastMessages";
import { useAuthentication } from "@/contexts/authentication";
const Navbar = () => {
  const router = useRouter();
  const { Info } = useToastMessages();
  const { logout, user } = useAuthentication();

  const signOut = async () => {
    await logout();
    Info("Logged Out !");
    router.push("/");
  };

  return (
    <>
      <div className="bg-slate-600 flex justify-around items-center gap-9 p-5 text-3xl sticky top-0 ">
        <h1 className="text-3xl text-white font-semibold flex justify-center items-center gap-4">
          E-Voting System <TbBrandNextjs className=" text-3xl" />
          <SiFirebase className="text-[#FF8F00] text-3xl" />
        </h1>
        {user && (
          <button
            className="font-Pacifico text-xl rounded-lg hover:text-white w-auto p-2 bg-[#7b9194]"
            onClick={() => {
              signOut();
              Info("Logged Out !");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
