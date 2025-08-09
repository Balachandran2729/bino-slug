import TextType from "@/components/TextType";
export default function Home() {
  return (
    <div className="p-8 text-gray-700">
      <h2 className="font-bold text-xl">API Request Example</h2>
      <p className="text-[15px] mt-2">Use Postman for send Data</p>
      <div className="flex flex-row   px-20 rounded-lg text-sm space-y-1">
        {/* left side */}
        <div className="w-1/2 flex flex-col justify-center items-start text-[17px]">
          <h3 className="font-semibold">Method : <span className="text-blue-600">POST</span></h3>
          <h3 className="font-semibold">URL : <span className="text-blue-600">https://bino-slug.vercel.app/api/pages</span></h3>
          <h3 className="font-semibold">Headers : <span className="text-blue-600">Content-Type: application/json</span></h3>
        </div>
        {/* right side */}
        <div className="w-1/2 text-[17px] font-bold">
          <h3 className="font-semibold">Body :
          </h3>
          <div>slug: <span>
            <TextType 
              text={["about-bino", "test-bino","search Bino", "Any Slug"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </span></div>
          <p>components: [</p>
          <div>&nbsp;&nbsp;{'{ type: "TextSection", props: { text: '}<span>
            <TextType 
              text={["Welcome to Bino.bot!", "Hello from Bino!", "Explore Bino.bot"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          {' } },'},</span></div>
          <p>&nbsp;&nbsp;{'{ type: "ImageBlock", props: { src: "https://picsum.photos/400/300", alt: "Kitten" } },'}</p>
          <p>&nbsp;&nbsp;{'{ type: "Card", props: { title: "title", text: "Welcome to Bino.bot!" } },'}</p>
          <p>&nbsp;&nbsp;{'{ type: "CallToAction", props: { text: "Visit Bino.bot", href: "https://bino.bot" } }'}</p>
          <p>]</p>
        </div>
      </div>
    </div>
  );
}
