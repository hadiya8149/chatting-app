var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  res.clearCookie("username");
  res.clearCookie("token");
  console.log("res.cookies",res.cookies);
  res.redirect("http://localhost:3000")
});

module.exports = router;