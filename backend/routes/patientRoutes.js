const express = require('express');
const router = express.Router();
const { getPatientProfile, updatePatientProfile, getPatients } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/profile')
  .get(protect, authorize('Patient'), getPatientProfile)
  .put(protect, authorize('Patient'), updatePatientProfile);

router.route('/')
  .get(protect, authorize('Admin', 'Doctor'), getPatients);

module.exports = router;
