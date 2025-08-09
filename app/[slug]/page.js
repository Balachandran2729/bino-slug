import TextSection from "@/components/TextSection";
import Card from "@/components/Card";
import ImageBlock from "@/components/ImageBlock";
import CallToAction from "@/components/CallToAction";
import NotFound from "@/components/NotFound";
import { getPages } from "@/lib/pageStore";

const componentsMap = {
  TextSection,
  ImageBlock,
  CallToAction,
  Card,
};

export default async function DynamicPage({ params }) {
  const { slug } = params;
  const pages = await getPages(); 
  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    return <NotFound />;
  }

  const getComp = (block) => {
    if (!block) return null;
    const Comp = componentsMap[block.type];
    return Comp ? <Comp {...block.props} /> : null;
  };

  const textSectionBlock = page.components.find((c) => c.type === "TextSection");
  const cardBlock = page.components.find((c) => c.type === "Card");
  const imageBlock = page.components.find((c) => c.type === "ImageBlock");
  const ctaBlock = page.components.find((c) => c.type === "CallToAction");

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
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
            {ctaBlock && <div className="mt-4 text-center">{getComp(ctaBlock)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";