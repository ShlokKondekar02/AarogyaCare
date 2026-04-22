const admin = require('firebase-admin');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { connectDB, getDB } = require('./config/db');

dotenv.config();
connectDB();
const db = getDB();

const doctorsData = [
  { name: 'Dr. Rohan Patil', email: 'rohan@aarogya.com', specialization: 'Kayachikitsa (General Medicine)', qualification: 'BAMS, MD', fee: 500 },
  { name: 'Dr. Sneha Kulkarni', email: 'sneha@aarogya.com', specialization: 'Shalya Tantra (Surgery)', qualification: 'BAMS, MS', fee: 600 },
  { name: 'Dr. Amit Deshmukh', email: 'amit@aarogya.com', specialization: 'Panchakarma Specialist', qualification: 'BAMS, MD', fee: 700 },
  { name: 'Dr. Priya Joshi', email: 'priya@aarogya.com', specialization: 'Prasuti & Stri Roga (Gynaecology)', qualification: 'BAMS, MD', fee: 550 },
  { name: 'Dr. Mahesh Sharma', email: 'mahesh@aarogya.com', specialization: 'Shalakya Tantra (ENT & Ophthalmology)', qualification: 'BAMS, MS', fee: 500 },
];

const patientsData = [
  { name: 'Rahul Jadhav', email: 'rahul@gmail.com', age: 30, gender: 'Male', address: 'Solapur, Maharashtra' },
  { name: 'Priya More', email: 'priyam@gmail.com', age: 25, gender: 'Female', address: 'Pune, Maharashtra' },
  { name: 'Suresh Patil', email: 'suresh@gmail.com', age: 45, gender: 'Male', address: 'Solapur, Maharashtra' },
  { name: 'Neha Shinde', email: 'neha@gmail.com', age: 28, gender: 'Female', address: 'Mumbai, Maharashtra' },
  { name: 'Kavita Pawar', email: 'kavita@gmail.com', age: 35, gender: 'Female', address: 'Solapur, Maharashtra' },
  { name: 'Aniket Chavan', email: 'aniket@gmail.com', age: 22, gender: 'Male', address: 'Kolhapur, Maharashtra' },
];

const adminsData = [
  { name: 'Rajesh Kulkarni', email: 'rajesh@aarogya.com' },
  { name: 'Meena Patil', email: 'meena@aarogya.com' },
];

const deleteCollection = async (collectionPath) => {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__');
  
  const snapshot = await query.get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

const importData = async () => {
  try {
    console.log('🧹 Clearing existing data...');
    await deleteCollection('users');
    await deleteCollection('doctors');
    await deleteCollection('patients');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Import Admins
    console.log('🚀 Importing Admins...');
    for (const admin of adminsData) {
      await db.collection('users').add({
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: 'Admin',
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }

    // Import Doctors
    console.log('🚀 Importing Doctors...');
    for (const doc of doctorsData) {
      const userRef = await db.collection('users').add({
        name: doc.name,
        email: doc.email,
        password: hashedPassword,
        role: 'Doctor',
        isActive: true,
        createdAt: new Date().toISOString()
      });

      await db.collection('doctors').add({
        user: userRef.id,
        specialization: doc.specialization,
        qualification: doc.qualification,
        consultationFee: doc.fee,
        experience: 10,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        availableTimeStart: '09:00',
        availableTimeEnd: '18:00',
        createdAt: new Date().toISOString()
      });
    }

    // Import Patients
    console.log('🚀 Importing Patients...');
    for (const pat of patientsData) {
      const userRef = await db.collection('users').add({
        name: pat.name,
        email: pat.email,
        password: hashedPassword,
        role: 'Patient',
        isActive: true,
        createdAt: new Date().toISOString()
      });

      await db.collection('patients').add({
        user: userRef.id,
        age: pat.age,
        gender: pat.gender,
        address: pat.address,
        dosha: 'Unknown',
        createdAt: new Date().toISOString()
      });
    }

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
