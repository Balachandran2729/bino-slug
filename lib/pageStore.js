
import admin from "firebase-admin";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}
const db = admin.firestore();
export async function getPages() {
  console.log("Fetching pages from Firestore (server-side).");
  const snapshot = await db.collection("pages").get();
  return snapshot.docs.map(doc => doc.data());
}
export async function addPage(page) {
  console.log("Adding page to Firestore (server-side).");
  const newDoc = {
    ...page,
    createdAt: new Date().toISOString(),
  };
  await db.collection("pages").add(newDoc);
  return { message: "Page added successfully to Firestore." };
}
