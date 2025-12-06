// routes/admin.therapists.js
// Private CRUD pages for therapists

const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const { ensureAuth } = require('../middleware/auth');

// All routes require authentication
router.use(ensureAuth);

// LIST
router.get('/therapists', async (req, res) => {
  const therapists = await Therapist.find().sort('name');
  res.render('admin/therapists/index', {
    title: 'Manage Therapists',
    therapists
  });
});

// CREATE FORM
router.get('/therapists/new', (req, res) => {
  res.render('admin/therapists/form', {
    title: 'New Therapist',
    therapist: {}
  });
});

// CREATE ACTION
router.post('/therapists', async (req, res) => {
  const { name, photoUrl, bio, specialties, yearsExperience } = req.body;

  await Therapist.create({
    name,
    photoUrl,
    bio,
    yearsExperience,
    specialties: specialties ? specialties.split(',').map(s => s.trim()) : []
  });

  res.redirect('/admin/therapists');
});

// EDIT FORM
router.get('/therapists/:id/edit', async (req, res) => {
  const therapist = await Therapist.findById(req.params.id);
  res.render('admin/therapists/form', {
    title: 'Edit Therapist',
    therapist
  });
});

// UPDATE ACTION
router.post('/therapists/:id', async (req, res) => {
  const { name, photoUrl, bio, specialties, yearsExperience, _method } = req.body;

  if (_method === 'PUT') {
    await Therapist.findByIdAndUpdate(req.params.id, {
      name,
      photoUrl,
      bio,
      yearsExperience,
      specialties: specialties ? specialties.split(',').map(s => s.trim()) : []
    });
  }

  res.redirect('/admin/therapists');
});

// DELETE CONFIRMATION
router.get('/therapists/:id/delete', async (req, res) => {
  const therapist = await Therapist.findById(req.params.id);
  res.render('admin/therapists/delete', {
    title: 'Delete Therapist',
    therapist
  });
});

// DELETE ACTION
router.post('/therapists/:id/delete', async (req, res) => {
  if (req.body._method === 'DELETE') {
    await Therapist.findByIdAndDelete(req.params.id);
  }
  res.redirect('/admin/therapists');
});

module.exports = router;
