// routes/admin.services.js
// Private CRUD pages for spa services (only authenticated users)

const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { ensureAuth } = require('../middleware/auth');

// All routes here require auth
router.use(ensureAuth);

// GET /admin/services - list all services for admin
router.get('/services', async (req, res, next) => {
  try {
    const services = await Service.find().sort('name');
    res.render('admin/services/index', {
      title: 'Manage Services',
      services
    });
  } catch (err) {
    next(err);
  }
});

// GET /admin/services/new - show create form
router.get('/services/new', (req, res) => {
  res.render('admin/services/form', {
    title: 'New Service',
    service: {}
  });
});

// POST /admin/services - create new service
router.post('/services', async (req, res, next) => {
  try {
    const { name, slug, description, durationMins, basePrice, tags } = req.body;

    await Service.create({
      name,
      slug,
      description,
      durationMins,
      basePrice,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });

    res.redirect('/admin/services');
  } catch (err) {
    next(err);
  }
});

// GET /admin/services/:id/edit - show edit form
router.get('/services/:id/edit', async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.redirect('/admin/services');

    res.render('admin/services/form', {
      title: 'Edit Service',
      service
    });
  } catch (err) {
    next(err);
  }
});

// POST /admin/services/:id - update (using hidden _method field)
router.post('/services/:id', async (req, res, next) => {
  try {
    const { name, slug, description, durationMins, basePrice, tags, _method } = req.body;

    if (_method === 'PUT') {
      await Service.findByIdAndUpdate(req.params.id, {
        name,
        slug,
        description,
        durationMins,
        basePrice,
        tags: tags ? tags.split(',').map(t => t.trim()) : []
      });
    }

    res.redirect('/admin/services');
  } catch (err) {
    next(err);
  }
});

// GET /admin/services/:id/delete - confirmation page
router.get('/services/:id/delete', async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.redirect('/admin/services');

    res.render('admin/services/delete', {
      title: 'Delete Service',
      service
    });
  } catch (err) {
    next(err);
  }
});

// POST /admin/services/:id/delete - actually delete
router.post('/services/:id/delete', async (req, res, next) => {
  try {
    const { _method } = req.body;

    if (_method === 'DELETE') {
      await Service.findByIdAndDelete(req.params.id);
    }

    res.redirect('/admin/services');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
