import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  const body = await request.json();
  const filePath = path.join(process.cwd(), "data", "pages.json");
  let pages = [];
  try {
    const data = await fs.readFile(filePath, "utf-8");
    pages = JSON.parse(data);
  } catch (error) {
    pages = [];
  }
  const slugExists = pages.some((page) => page.slug === body.slug);
  if (slugExists) {
    return new Response(
      JSON.stringify({ message: "Slug name already exists" }), 
      {
        status: 409,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  pages.push(body);
  await fs.writeFile(filePath, JSON.stringify(pages, null, 2));
  return new Response(
    JSON.stringify({ message: "Page created", slug: body.slug }), 
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}