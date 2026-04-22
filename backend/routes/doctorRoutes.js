const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorProfile, updateDoctorAvailability } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getDoctors); // Public access

router.route('/profile')
  .get(protect, authorize('Doctor'), getDoctorProfile);

router.route('/availability')
  .put(protect, authorize('Doctor'), updateDoctorAvailability);

module.exports = router;
