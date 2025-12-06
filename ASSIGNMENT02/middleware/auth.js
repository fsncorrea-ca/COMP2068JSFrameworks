// middleware/auth.js
// Simple middleware to ensure the user is authenticated before accessing a route

exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // user is logged in, proceed
    return next();
  }
  // not logged in, redirect to login page
  res.redirect('/login');
};
