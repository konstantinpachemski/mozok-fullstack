"use client";

import Link from "next/link";
import NavBarAuthButtons from "./NavBarAuthButtons";

export const Navbar = () => {
  return (
    <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="container mx-auto w-full max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between font-semibold">
          <Link
            href="/"
            className="bold flex items-center hover:scale-110 transition"
          >
            Mozok
          </Link>
          <nav className="gap-4">
            <Link
              href="/todo"
              className="flex items-center text-md hover:scale-110 transition"
            >
              Todos
            </Link>
          </nav>

          <NavBarAuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
