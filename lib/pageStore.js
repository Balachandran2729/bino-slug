// lib/pageStore.js
import admin from "firebase-admin";

// Prevent initializing multiple times in dev/hot-reload
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

/**
 * Get all pages from Firestore
 */
export async function getPages() {
  console.log("Fetching pages from Firestore (server-side).");
  const snapshot = await db.collection("pages").get();
  return snapshot.docs.map(doc => doc.data());
}

/**
 * Add a page to Firestore
 * @param {Object} page - The page data
 */
export async function addPage(page) {
  console.log("Adding page to Firestore (server-side).");
  const newDoc = {
    ...page,
    createdAt: new Date().toISOString(),
  };
  await db.collection("pages").add(newDoc);
  return { message: "Page added successfully to Firestore." };
}
