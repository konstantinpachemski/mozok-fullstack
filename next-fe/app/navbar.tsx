import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="container mx-auto w-full max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between font-semibold">
          <Link href="/" className="bold flex items-center">
            Mozok
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden gap-4 md:flex">
            <Link
              href="/"
              className="flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm transition-colors hover:underline"
            >
              About
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm transition-colors hover:underline"
            >
              Services
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm transition-colors hover:underline"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <>
              <button>
                <Link href="/auth/login">Login</Link>
              </button>
              <button>
                <Link href="/auth/signup">Sign up</Link>
              </button>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
