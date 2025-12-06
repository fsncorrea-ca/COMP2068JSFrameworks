// routes/auth.js
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// GET /login
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// GET /register
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// POST /register
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Email and password are required.',
      email,
      displayName
    });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Email already in use.',
      email,
      displayName
    });
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash: hash, displayName });

  res.redirect('/login');
});

// POST /login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/admin/services',
    failureRedirect: '/login'
  })
);

// GET /logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
