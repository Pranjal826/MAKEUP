var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const multer=require('multer')
const LocalStrategy = require("passport-local");
const flash=require('express-flash')
passport.use(new LocalStrategy(User.authenticate()));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Initiate multer
const upload = multer({
    storage: storage,
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

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

        // Validate password using the regular expression
        if (!passwordRegex.test(req.body.password)) {
            return res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Password',
                            text: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit',
                        }).then(()=>{
                            window.location.href='/signup';
                        });
                    });

                </script>
            `);
        }

        // If no duplicacy and password is valid, proceed with user registration
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
    console.log('Views Directory:', router.get('views'));
    res.render("Signup", {admin: req.user });
});

module.exports = router;
