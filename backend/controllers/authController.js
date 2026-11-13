const { getDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'aarogyacare_fallback_jwt_secret_key_123', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (Patient by default)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    return res.status(201).json({
      _id: 'local_' + Date.now(),
      name,
      email,
      role: 'Patient',
      token: generateToken('local_' + Date.now()),
    });
  }

  const db = getDB();

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRef = await db.collection('users').add({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'Patient',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Create patient profile link
    await db.collection('patients').add({
      user: userRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    res.status(201).json({
      _id: userRef.id,
      name,
      email,
      role: 'Patient',
      token: generateToken(userRef.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const admin = require('firebase-admin');

  // Local demo fallback if Firebase is not connected
  if (!admin.apps.length) {
    if (email.includes('rohan@aarogya.com') || email.includes('amit@aarogya.com') || email.includes('sneha@aarogya.com') || email.includes('doctor')) {
      return res.json({
        _id: 'doc_' + Date.now(),
        name: email.includes('rohan') ? 'Dr. Rohan Patil (BAMS, MD)' :
              email.includes('amit') ? 'Dr. Amit Deshmukh (Panchakarma Specialist)' :
              email.includes('sneha') ? 'Dr. Sneha Kulkarni (BAMS, MS)' : 'Dr. BAMS Practitioner',
        email,
        role: 'Doctor',
        token: generateToken('doc_1'),
      });
    }

    if (email.includes('rajesh@aarogya.com') || email.includes('admin')) {
      return res.json({
        _id: 'admin_' + Date.now(),
        name: 'Rajesh Kulkarni (Chief Admin)',
        email,
        role: 'Admin',
        token: generateToken('admin_1'),
      });
    }

    if (password === 'password123') {
      return res.json({
        _id: 'demo_' + Date.now(),
        name: 'BAMS Clinical Staff',
        email,
        role: email.includes('admin') ? 'Admin' : 'Doctor',
        token: generateToken('demo_1'),
      });
    }

    return res.status(401).json({ message: 'Invalid credentials. For demo accounts use password123' });
  }

  const db = getDB();

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.password);

    if (isMatch) {
      res.json({
        _id: userDoc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token: generateToken(userDoc.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
