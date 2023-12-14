const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signin", (req, res) => {
  res.render("Signin",{admin:req.user}); // Assuming you have a view engine set up
});

router.post("/signin", passport.authenticate("local", {
  successRedirect: "/", // Redirect on successful login
  failureRedirect: "/signin",    // Redirect on failed login
  failureFlash: true              // Enable flash messages for failed login
}));

module.exports = router;
