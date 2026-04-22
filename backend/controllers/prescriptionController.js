const { getDB } = require('../config/db');

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor)
const createPrescription = async (req, res) => {
  const { appointmentId, patientId, medicines, diagnosis, dietPlan, nextFollowUp } = req.body;
  const db = getDB();

  try {
    const appointmentRef = db.collection('appointments').doc(appointmentId);
    const appointmentDoc = await appointmentRef.get();
    
    if (!appointmentDoc.exists) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const prescriptionRef = await db.collection('prescriptions').add({
      appointment: appointmentId,
      patient: patientId,
      doctor: req.user.id, // User ID of doctor
      medicines,
      diagnosis,
      dietPlan,
      nextFollowUp,
      createdAt: new Date().toISOString()
    });

    // Mark appointment as completed
    await appointmentRef.update({
      status: 'Completed',
      updatedAt: new Date().toISOString()
    });

    const prescriptionDoc = await prescriptionRef.get();
    res.status(201).json({ id: prescriptionDoc.id, ...prescriptionDoc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get prescriptions for a patient
// @route   GET /api/prescriptions/patient/:patientId
// @access  Private
const getPatientPrescriptions = async (req, res) => {
  const db = getDB();
  try {
    const prescriptionsSnapshot = await db.collection('prescriptions').where('patient', '==', req.params.patientId).get();
    
    const prescriptions = await Promise.all(prescriptionsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      // Populate doctor (user)
      const doctorDoc = await db.collection('users').doc(data.doctor).get();
      const doctorData = doctorDoc.exists ? doctorDoc.data() : null;
      
      // Populate appointment
      const appointmentDoc = await db.collection('appointments').doc(data.appointment).get();
      const appointmentData = appointmentDoc.exists ? appointmentDoc.data() : null;
      
      return {
        id: doc.id,
        ...data,
        doctor: doctorData ? {
          id: doctorDoc.id,
          name: doctorData.name,
          email: doctorData.email
        } : null,
        appointment: appointmentData ? {
          id: appointmentDoc.id,
          ...appointmentData
        } : null
      };
    }));
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPrescription,
  getPatientPrescriptions
};
