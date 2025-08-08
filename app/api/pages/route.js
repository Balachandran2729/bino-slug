
import fs from "fs";
import path from "path";

function getFilePath() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "pages.json");
  }
  return path.join(process.cwd(), "data", "pages.json");
}
export async function GET() {
  const filePath = getFilePath();

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    return new Response(data, { status: 200 });
  }
  return new Response(JSON.stringify([]), { status: 200 });
}
export async function POST(req) {
  const filePath = getFilePath();
  let pages = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    pages = JSON.parse(fileData);
  }
  const body = await req.json();
  pages.push(body);
  fs.writeFileSync(filePath, JSON.stringify(pages, null, 2));
  return new Response(
    JSON.stringify({ message: "Page created", slug: body.slug }),
    { status: 201 }
  );
}
