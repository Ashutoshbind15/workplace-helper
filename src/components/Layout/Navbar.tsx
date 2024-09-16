import Link from "next/link";
import React from "react";
import UserDropComp from "./UserDropComp";

const Navbar = () => {
  return (
    <nav className="flex items-center px-4 py-2 border-b-2 border-black bg-gray-800 text-white">
      <Link href={"/"} className="flex-1 font-semibold text-lg font-serif">
        Workplace-help-app
      </Link>

      <div className="flex gap-x-3 items-center font-semibold font-mono">
        <Link href={"/profile"} className="flex-1">
          Profile
        </Link>
        <Link href={"/teams"} className="flex-1">
          Teams
        </Link>

        <UserDropComp />
      </div>
    </nav>
  );
};

export default Navbar;
