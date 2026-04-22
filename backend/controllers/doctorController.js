const { getDB } = require('../config/db');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  const db = getDB();
  try {
    const doctorsSnapshot = await db.collection('doctors').get();
    const doctors = await Promise.all(doctorsSnapshot.docs.map(async (doc) => {
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
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private (Doctor)
const getDoctorProfile = async (req, res) => {
  const db = getDB();
  try {
    const doctorSnapshot = await db.collection('doctors').where('user', '==', req.user.id).limit(1).get();
    if (!doctorSnapshot.empty) {
      const doctorDoc = doctorSnapshot.docs[0];
      const doctorData = doctorDoc.data();
      
      const userDoc = await db.collection('users').doc(doctorData.user).get();
      const userData = userDoc.exists ? userDoc.data() : null;

      res.json({
        id: doctorDoc.id,
        ...doctorData,
        user: userData ? {
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        } : null
      });
    } else {
      res.status(404).json({ message: 'Doctor profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update doctor availability
// @route   PUT /api/doctors/availability
// @access  Private (Doctor)
const updateDoctorAvailability = async (req, res) => {
  const db = getDB();
  try {
    const doctorSnapshot = await db.collection('doctors').where('user', '==', req.user.id).limit(1).get();

    if (!doctorSnapshot.empty) {
      const doctorRef = doctorSnapshot.docs[0].ref;
      const updates = {
        availableDays: req.body.availableDays || null,
        availableTimeStart: req.body.availableTimeStart || null,
        availableTimeEnd: req.body.availableTimeEnd || null,
        updatedAt: new Date().toISOString()
      };

      await doctorRef.update(updates);
      const updatedDoc = await doctorRef.get();
      res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorProfile,
  updateDoctorAvailability
};
