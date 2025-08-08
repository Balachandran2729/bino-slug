import fs from "fs";
import path from "path";

const tmpFilePath = "/tmp/pages.json";
const defaultFilePath = path.join(process.cwd(), "data", "pages.json");
export async function GET() {
  try {
    let data;
    if (fs.existsSync(tmpFilePath)) {
      data = JSON.parse(fs.readFileSync(tmpFilePath, "utf-8"));
    } else {
      data = JSON.parse(fs.readFileSync(defaultFilePath, "utf-8"));
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    let pages = [];
    if (fs.existsSync(tmpFilePath)) {
      pages = JSON.parse(fs.readFileSync(tmpFilePath, "utf-8"));
    } else {
      pages = JSON.parse(fs.readFileSync(defaultFilePath, "utf-8"));
    }
    pages.push(body);
    fs.writeFileSync(tmpFilePath, JSON.stringify(pages, null, 2));

    return new Response(
      JSON.stringify({ message: "Page created", slug: body.slug }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
