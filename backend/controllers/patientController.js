const { getDB } = require('../config/db');

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private (Patient)
const getPatientProfile = async (req, res) => {
  const db = getDB();
  try {
    const patientSnapshot = await db.collection('patients').where('user', '==', req.user.id).limit(1).get();
    
    if (!patientSnapshot.empty) {
      const patientDoc = patientSnapshot.docs[0];
      const patientData = patientDoc.data();
      
      // Manually populate user data
      const userDoc = await db.collection('users').doc(patientData.user).get();
      const userData = userDoc.exists ? userDoc.data() : null;
      
      res.json({
        id: patientDoc.id,
        ...patientData,
        user: userData ? {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        } : null
      });
    } else {
      res.status(404).json({ message: 'Patient profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private (Patient)
const updatePatientProfile = async (req, res) => {
  const db = getDB();
  try {
    const patientSnapshot = await db.collection('patients').where('user', '==', req.user.id).limit(1).get();

    if (!patientSnapshot.empty) {
      const patientRef = patientSnapshot.docs[0].ref;
      const updates = {
        age: req.body.age || null,
        gender: req.body.gender || null,
        address: req.body.address || null,
        bloodGroup: req.body.bloodGroup || null,
        dosha: req.body.dosha || null,
        updatedAt: new Date().toISOString()
      };

      await patientRef.update(updates);
      const updatedDoc = await patientRef.get();
      res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all patients (for Admin/Doctor)
// @route   GET /api/patients
// @access  Private (Admin, Doctor)
const getPatients = async (req, res) => {
  const db = getDB();
  try {
    const patientsSnapshot = await db.collection('patients').get();
    const patients = await Promise.all(patientsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const userDoc = await db.collection('users').doc(data.user).get();
      const userData = userDoc.exists ? userDoc.data() : null;
      return {
        id: doc.id,
        ...data,
        user: userData ? {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        } : null
      };
    }));
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
  getPatients
};
