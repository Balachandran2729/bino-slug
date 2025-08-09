import admin from "firebase-admin";

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
export async function getPageBySlug(slug) {
  const snapshot = await db.ref("pages")
    .orderByChild("slug")
    .equalTo(slug)
    .once("value");

  const data = snapshot.val();
  return data ? Object.values(data)[0] : null;
}
export async function addPage(page) {
  if (await getPageBySlug(page.slug)) {
    throw new Error(`The routing name '${page.slug}' already exists`);
  }
  await db.ref("pages").push({
    ...page,
    createdAt: new Date().toISOString(),
  });
  return { message: "Page added successfully to Realtime Database." };
}
