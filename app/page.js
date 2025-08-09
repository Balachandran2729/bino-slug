"use client"

import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import TextType from "@/components/TextType";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const exampleBody = `{
  "slug": "about-bino",
  "components": [
    { "type": "TextSection", "props": { "text": "Welcome to Bino.bot!" } },
    { "type": "ImageBlock", "props": { "src": "https://images.unsplash.com/photo-1519389950473-47ba0277781c", "alt": "Kitten" } },
    { "type": "Card", "props": { "title": "title", "text": "Welcome to Bino.bot!" } },
    { "type": "CallToAction", "props": { "text": "Visit Bino.bot", "href": "https://bino.bot" } }
  ]
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 text-gray-700">
      <h2 className="font-bold text-xl">API Request Example</h2>
      <p className="text-[15px] mt-2">Use Postman to send data</p>

      <div className="flex flex-row px-20 rounded-lg text-sm space-y-1">
        {/* Left side */}
        <div className="w-1/2 flex flex-col justify-center items-start text-[17px]">
          <h3 className="font-semibold">
            Method : <span className="text-blue-600">POST</span>
          </h3>
          <h3 className="font-semibold">
            URL : <span className="text-blue-600">https://bino-slug.vercel.app/api/pages</span>
          </h3>
          <h3 className="font-semibold">
            Headers : <span className="text-blue-600">Content-Type: application/json</span>
          </h3>
        </div>

        {/* Right side */}
        <div className="w-1/2 relative">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-200  transition"
            title="Copy to clipboard"
          >
            <FiCopy className="text-white text-lg hover:text-gray-700" />
          </button>

          {/* Code card */}
          <div className="bg-gray-900 text-green-300 font-mono text-sm rounded-lg p-4 whitespace-pre overflow-x-auto shadow-lg">
{`{
  "slug": "`}<TextType 
              text={["about-bino", "test-bino","search-bino", "any-slug"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />{`",
  "components": [
    { "type": "TextSection", "props": { "text": "`}
<TextType 
              text={["Welcome to Bino.bot!", "Hello from Bino!", "Explore Bino.bot"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />{`" } },
    { "type": "ImageBlock", "props": { "src": "https://picsum.photos/400/300", "alt": "Kitten" } },
    { "type": "Card", "props": { "title": "title", "text": "Welcome to Bino.bot!" } },
    { "type": "CallToAction", "props": { "text": "Visit Bino.bot", "href": "https://bino.bot" } }
  ]
}`}
          </div>

          {/* Copy confirmation */}
          {copied && (
            <p className="absolute bottom-2 right-2 text-xs text-green-400">
              ✅ Copied!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
