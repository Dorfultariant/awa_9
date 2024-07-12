const express = require('express');
const router = express.Router();

const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html', { title: 'Express' });
});

router.get("/register.html", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public/register.html"));
});

router.get("/login.html", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});

module.exports = router;
