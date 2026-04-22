const admin = require("firebase-admin");

const connectDB = () => {
  try {
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