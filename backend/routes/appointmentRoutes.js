const express = require('express');
const router = express.Router();
const { bookAppointment, getUserAppointments, cancelAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/book')
  .post(protect, authorize('Patient', 'Receptionist'), bookAppointment);

router.route('/user')
  .get(protect, getUserAppointments);

router.route('/:id/cancel')
  .put(protect, cancelAppointment);

module.exports = router;
