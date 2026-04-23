const { getDB } = require('../config/db');

// @desc    Book an appointment
// @route   POST /api/appointments/book
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
  const { doctorId, date, timeSlot, type, consultationType, notes } = req.body;
  const db = getDB();

  try {
    const patientSnapshot = await db.collection('patients').where('user', '==', req.user.id).limit(1).get();
    if (patientSnapshot.empty) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    const patientDoc = patientSnapshot.docs[0];

    // Simple token number generation based on today's appointments for that doctor
    const todayStr = new Date(date).toISOString().split('T')[0];
    const tomorrowStr = new Date(new Date(date).getTime() + 86400000).toISOString().split('T')[0];

    const appointmentsSnapshot = await db.collection('appointments')
      .where('doctor', '==', doctorId)
      .where('date', '>=', todayStr)
      .where('date', '<', tomorrowStr)
      .get();

    const tokenNumber = appointmentsSnapshot.size + 1;

    const appointmentRef = await db.collection('appointments').add({
      patient: patientDoc.id,
      doctor: doctorId,
      date,
      timeSlot,
      type,
      consultationType,
      tokenNumber,
      notes,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const appointmentDoc = await appointmentRef.get();
    res.status(201).json({ id: appointmentDoc.id, ...appointmentDoc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/user
// @access  Private
const getUserAppointments = async (req, res) => {
  const db = getDB();
  try {
    let appointments = [];
    if (req.user.role === 'Patient') {
      const patientSnapshot = await db.collection('patients').where('user', '==', req.user.id).limit(1).get();
      if (!patientSnapshot.empty) {
        const patientId = patientSnapshot.docs[0].id;
        const appSnapshot = await db.collection('appointments').where('patient', '==', patientId).get();
        
        // Sort in memory to avoid composite index requirement
        const sortedDocs = appSnapshot.docs.sort((a, b) => {
          return (a.data().date || '').localeCompare(b.data().date || '');
        });

        appointments = await Promise.all(sortedDocs.map(async (doc) => {
          const data = doc.data();
          // Populate doctor and doctor's user info
          const doctorDoc = await db.collection('doctors').doc(data.doctor).get();
          const doctorData = doctorDoc.exists ? doctorDoc.data() : null;
          let doctorUserInfo = null;
          if (doctorData) {
            const userDoc = await db.collection('users').doc(doctorData.user).get();
            doctorUserInfo = userDoc.exists ? userDoc.data() : null;
          }
          return {
            id: doc.id,
            ...data,
            doctor: doctorData ? {
              ...doctorData,
              user: doctorUserInfo ? {
                name: doctorUserInfo.name,
                email: doctorUserInfo.email,
                phone: doctorUserInfo.phone
              } : null
            } : null
          };
        }));
      }
    } else if (req.user.role === 'Doctor') {
      const doctorSnapshot = await db.collection('doctors').where('user', '==', req.user.id).limit(1).get();
      if (!doctorSnapshot.empty) {
        const doctorId = doctorSnapshot.docs[0].id;
        const appSnapshot = await db.collection('appointments').where('doctor', '==', doctorId).get();
        
        // Sort in memory to avoid composite index requirement
        const sortedDocs = appSnapshot.docs.sort((a, b) => {
          return (a.data().date || '').localeCompare(b.data().date || '');
        });

        appointments = await Promise.all(sortedDocs.map(async (doc) => {
          const data = doc.data();
          // Populate patient and patient's user info
          const patientDoc = await db.collection('patients').doc(data.patient).get();
          const patientData = patientDoc.exists ? patientDoc.data() : null;
          let patientUserInfo = null;
          if (patientData) {
            const userDoc = await db.collection('users').doc(patientData.user).get();
            patientUserInfo = userDoc.exists ? userDoc.data() : null;
          }
          return {
            id: doc.id,
            ...data,
            patient: patientData ? {
              ...patientData,
              user: patientUserInfo ? {
                name: patientUserInfo.name,
                email: patientUserInfo.email,
                phone: patientUserInfo.phone
              } : null
            } : null
          };
        }));
      }
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res) => {
  const db = getDB();
  try {
    const appointmentRef = db.collection('appointments').doc(req.params.id);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointmentRef.update({
      status: 'Cancelled',
      updatedAt: new Date().toISOString()
    });
    
    const updatedDoc = await appointmentRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getUserAppointments,
  cancelAppointment
};
