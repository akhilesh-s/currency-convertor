import Image from "next/image";
import Convertor from "@/layouts/convertor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Convertor />
    </main>
  );
}
