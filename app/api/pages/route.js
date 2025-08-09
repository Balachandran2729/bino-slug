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
      { message: "Page created and stored in Firestore", id: newPage.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating page:', error);
    return Response.json(
      {
        error: "Failed to create page",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}