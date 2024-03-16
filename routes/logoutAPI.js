var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  res.clearCookie("username");
  res.clearCookie("token")
  res.send('Welcome')
});

module.exports = router;