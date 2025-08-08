import fs from "fs";
import path from "path";
import TextSection from "@/components/TextSection";
import Card from "@/components/Card";
import ImageBlock from "@/components/ImageBlock";
import CallToAction from "@/components/CallToAction";
import NotFound from "@/components/NotFound";
const componentsMap = {
  TextSection,
  ImageBlock,
  CallToAction,
  Card,
};
async function getPagesData() {
  const tmpPath = path.join("/tmp", "pages.json");
  if (fs.existsSync(tmpPath)) {
    const jsonData = fs.readFileSync(tmpPath, "utf-8");
    return JSON.parse(jsonData);
  }
  const dataPath = path.join(process.cwd(), "data", "pages.json");
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const pagesData = await getPagesData();
  const page = pagesData.find((p) => p.slug === slug);

  if (!page) {
    return <NotFound />;
  }

  const textSectionBlock = page.components.find((c) => c.type === "TextSection");
  const cardBlock = page.components.find((c) => c.type === "Card");
  const imageBlock = page.components.find((c) => c.type === "ImageBlock");
  const ctaBlock = page.components.find((c) => c.type === "CallToAction");

  const getComp = (block) => {
    if (!block) return null;
    const Comp = componentsMap[block.type];
    return Comp ? <Comp {...block.props} /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {textSectionBlock && (
          <div className="p-8 border-b border-gray-200">
            {getComp(textSectionBlock)}
          </div>
        )}

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {imageBlock && (
            <div className="w-full">
              <ImageBlock {...imageBlock.props} />
            </div>
          )}

          <div className="flex flex-col gap-6 justify-center">
            {cardBlock && <Card {...cardBlock.props} />}
            {ctaBlock && (
              <div className="mt-4 text-center">
                {getComp(ctaBlock)}
              </div>
            )}
          </div>
        </div>

        <div className="p-8 border-t border-gray-200">
          <div className="mt-6 space-y-4">
            {page.components
              .filter((b) => !["Card", "ImageBlock", "CallToAction", "TextSection"].includes(b.type))
              .map((b, idx) => {
                const Comp = componentsMap[b.type];
                if (!Comp) return null;
                return <Comp key={idx} {...b.props} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
