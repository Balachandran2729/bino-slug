import admin from "firebase-admin";

// Prevent re-initializing during hot reloads
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.includes("\\n")
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: "https://bino-dynamic-page-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

const db = admin.database();

/**
 * Get all pages from Realtime Database
 */
export async function getPages() {
  console.log("📄 Fetching pages from Realtime Database...");
  const snapshot = await db.ref("pages").once("value");
  const data = snapshot.val();
  return data ? Object.values(data) : [];
}

/**
 * Add a page to Realtime Database
 */
export async function addPage(page) {
  console.log("➕ Adding page to Realtime Database...");
  const newDoc = {
    ...page,
    createdAt: new Date().toISOString(),
  };
  await db.ref("pages").push(newDoc);
  return { message: "Page added successfully to Realtime Database." };
}
