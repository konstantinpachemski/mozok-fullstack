"use client";

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

const NavBarAuthButtons = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <p>{session.user.email}</p>
        <Link
          href="#"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center text-md hover:scale-110 transition"
        >
          Logout
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href={"/auth/login"}
        className="flex items-center text-md hover:scale-110 transition"
      >
        Login
      </Link>

      <Link
        href={"/auth/signup"}
        className="flex items-center text-md hover:scale-110 transition"
      >
        Sign up
      </Link>
    </div>
  );
};

export default NavBarAuthButtons;
