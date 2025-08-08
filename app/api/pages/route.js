import { getPages, setPages, addPage } from "@/lib/pageStore";

export async function GET() {
  return new Response(JSON.stringify(getPages()), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  addPage(body);
  return new Response(JSON.stringify({ message: "Page created" }), { status: 201 });
}

export const dynamic = "force-dynamic"; // ensures fresh fetch each time
