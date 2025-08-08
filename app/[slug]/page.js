
import pagesData from "@/data/pages.json";
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

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = pagesData.find((p) => p.slug === slug);

  if (!page) {
    return (
    <NotFound />
  );
  }

  // Find the specific blocks
  const textSectionBlock = page.components.find((c) => c.type === "TextSection");
  const cardBlock = page.components.find((c) => c.type === "Card");
  const imageBlock = page.components.find((c) => c.type === "ImageBlock");
  const ctaBlock = page.components.find((c) => c.type === "CallToAction");

  // Helper: get real React component from type string safely
  const getComp = (block) => {
    if (!block) return null;
    const Comp = componentsMap[block.type];
    return Comp ? <Comp {...block.props} /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Introductory Text Section */}
        {textSectionBlock && (
          <div className="p-8 border-b border-gray-200">
            {getComp(textSectionBlock)}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Image Column */}
          {imageBlock && (
            <div className="w-full">
              <ImageBlock {...imageBlock.props} />
            </div>
          )}

          {/* Card and CTA Column */}
          <div className="flex flex-col gap-6 justify-center">
            {cardBlock && (
              // Render the entire Card component for a cohesive look
              <Card {...cardBlock.props} />
            )}
            
            {ctaBlock && (
              <div className="mt-4 text-center">
                {getComp(ctaBlock)}
              </div>
            )}
          </div>
        </div>

        {/* This part remains for any other components you might add later */}
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