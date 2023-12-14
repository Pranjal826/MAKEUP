var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const upload = require('../utils/multer');
const LocalStrategy = require("passport-local");
const flash=require('express-flash')
passport.use(new LocalStrategy(User.authenticate()));

router.post("/signup", upload.single('dp'), async function (req, res, next) {
    try {
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
        if (existingUser) {
            return res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script>
                document.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Duplicate User',
                        text: 'A user with the same username or email already exists',
                    })
                    .then(function() {
                        window.location.href = '/signup';
                    });
                });
                </script>
            `);
        }

        // If no duplicacy, proceed with user registration
        await User.register(
            { username: req.body.username, email: req.body.email, phone: req.body.phone, dp: req.file.filename, accounttype: req.body.accounttype },
            req.body.password
        );
        
        res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You can now login',
                    }).then(function() {
                        // Redirect to /signin
                        window.location.href = '/signin';
                    });
                });
            </script>
        `);
    } catch (error) {
        console.error(error);
        res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Encountered!',
                        text: 'Please try again',
                    })
                    .then(function() {
                        // Redirect to /signup
                        window.location.href = '/signup';
                    });
                });
            </script>
        `);
    }
});
router.get("/signup", function (req, res, next) {
    // Assuming you are using flash messages
    res.render("signup", {admin: req.user });
});

module.exports = router;
