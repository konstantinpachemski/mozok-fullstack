import Image from "next/image";
import Login from "./auth/login/page";

export default function Home() {
  return (
    <main className="container flex flex-grow flex-col">
      <Login />
    </main>
  );
}
