const express = require('express');
const router = express.Router();
const { createPrescription, getPatientPrescriptions } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, authorize('Doctor'), createPrescription);

router.route('/patient/:patientId')
  .get(protect, getPatientPrescriptions);

module.exports = router;
