import { addPage } from '@/lib/pageStore';

export async function POST(req) {
  try {
    const body = await req.json();
    const newPage = {
      ...body,
      id: Date.now().toString(),
    };

    await addPage(newPage);

    return Response.json(
      { message: "Page created successfully", id: newPage.id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating page:", error);
    const statusCode = error.message.includes("already exists") ? 400 : 500;
    return Response.json(
      { error: error.message },
      { status: statusCode }
    );
  }
}
