const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, adminOnly } = require('../middleware/auth');

// @POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user._id });
    await booking.populate(['service', 'user']);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @GET /api/bookings (admin gets all, user gets their own)
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') query.user = req.user._id;
    const bookings = await Booking.find(query)
      .populate('service', 'name category price duration')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @GET /api/bookings/stats (admin)
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: 'Pending' });
    const confirmed = await Booking.countDocuments({ status: 'Confirmed' });
    const completed = await Booking.countDocuments({ status: 'Completed' });
    const cancelled = await Booking.countDocuments({ status: 'Cancelled' });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayBookings = await Booking.countDocuments({ createdAt: { $gte: today } });
    const upcoming = await Booking.find({ date: { $gte: new Date() }, status: { $in: ['Pending', 'Confirmed'] } })
      .populate('service', 'name')
      .populate('user', 'name phone')
      .sort({ date: 1 })
      .limit(10);
    res.json({ success: true, stats: { total, pending, confirmed, completed, cancelled, todayBookings }, upcoming });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @PUT /api/bookings/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (req.user.role !== 'admin' && req.body.status !== 'Cancelled') {
      return res.status(403).json({ success: false, message: 'Users can only cancel bookings' });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('service', 'name category price duration')
      .populate('user', 'name email phone');
    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
