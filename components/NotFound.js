"use client"

import Link from "next/link";
import NotFoung from "@/Animation/Error 404.json"
import Lottie from "lottie-react";
export default function NotFound() {
    return(
        <div className=" flex flex-col items-center justify-center px-4 pt-5">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center item-center">
          <Lottie animationData={NotFoung} loop={true} style={{ width: 300, height: 300 }} />
        </div>
        <p className="text-lg text-gray-600 font-mono mb-8">
          {"The page you're looking for doesn't exist or hasn't been created yet."}
        </p>
        <Link 
          href="/"
          className="inline-block py-3 px-6 bg-primary text-white rounded-full font-medium bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
    );
}