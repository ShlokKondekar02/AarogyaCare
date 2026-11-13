const admin = require("firebase-admin");

const connectDB = () => {
  try {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn("⚠️ Warning: Firebase credentials not found in .env (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). Database operations will require these to be configured.");
      return;
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log("✅ Firebase Admin Initialized");
    }
  } catch (error) {
    console.error(`❌ Firebase initialization error: ${error.message}`);
    process.exit(1);
  }
};

const db = admin.apps.length ? admin.firestore() : null;

// Helper to get db after initialization
const getDB = () => admin.firestore();

module.exports = { connectDB, getDB };
