import admin from "firebase-admin";

// Debug logging for environment variable setup
console.log("🔍 Firebase Admin SDK initialization...");
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID || "❌ MISSING");
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL || "❌ MISSING");
if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error("❌ FIREBASE_PRIVATE_KEY is missing");
} else {
  console.log("FIREBASE_PRIVATE_KEY length:", process.env.FIREBASE_PRIVATE_KEY.length);
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle both multiline and \n formats
        privateKey: process.env.FIREBASE_PRIVATE_KEY.includes("\\n")
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
    console.log("✅ Firebase Admin initialized");
  }
} catch (error) {
  console.error("🔥 Error initializing Firebase Admin:", error.message);
}

const db = admin.firestore(admin.app(),"bino-dynamic-page");
export async function getPages() {
  console.log("📄 Fetching pages from Firestore (server-side)...");
  try {
    const snapshot = await db.collection("pages").get();
    console.log(`✅ Retrieved ${snapshot.size} documents`);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("❌ Error fetching pages:", error.message);
    throw error;
  }
}

export async function addPage(page) {
  console.log("➕ Adding page to Firestore (server-side)...");
  const newDoc = {
    ...page,
    createdAt: new Date().toISOString(),
  };
  try {
    await db.collection("pages").add(newDoc);
    console.log("✅ Page added successfully");
    return { message: "Page added successfully to Firestore." };
  } catch (error) {
    console.error("❌ Error adding page:", error.message);
    throw error;
  }
}
