var express = require('express');
var router = express.Router();
const Service = require('../models/Service');
const Therapist = require('../models/Therapist');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Serenity Spa' });
});

// GET /therapists - Public list
router.get('/therapists', async (req, res, next) => {
  try {
    const therapists = await Therapist.find({ isActive: true }).sort('name');
    res.render('therapists', {
      title: 'Our Therapists',
      therapists
    });
  } catch (err) {
    next(err);
  }
});


// GET /services -> public read-only list with optional search
router.get('/services', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const filter = { isActive: true };

    if (q) {
      filter.$or = [
        { name:        new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { tags:        new RegExp(q, 'i') }
      ];
    }

    const services = await Service.find(filter).sort('name');

    res.render('services', {
      title: 'Spa Services',
      services,
      q,
      count: services.length
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
