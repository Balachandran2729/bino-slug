import { HiMenuAlt4 } from "react-icons/hi";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#ffffff] py-7 px-3 md:px-15 flex justify-between items-center shadow-md border-t-7 border-blue-700">
      <div className="flex items-center space-x-4 cursor-pointer">
        <Image src="/logo.png" alt="Bino Logo" 
          width={100}
          height={100}
        />
        <Image src="/logo2.png" alt="Bino Logo" 
          width={100}
          height={100} 
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-blue-600">Create New pages Dynamically</h1>
      </div>
      <div className="relative border-2 p-4 text-2xl cursor-pointer rounded-2xl border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group">
        <HiMenuAlt4 
          className="font-bold text-[#0B1129] cursor-pointer transition-transform duration-300 hover:scale-125"
        />
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2  text-gray-700 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Menu
        </span>
      </div>
    </nav>
  );
}
