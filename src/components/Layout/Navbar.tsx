import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center px-4">
      <Link href={"/"} className="flex-1">
        Workplace-help-app
      </Link>

      <div className="flex gap-x-3 items-center"></div>
    </nav>
  );
};

export default Navbar;
