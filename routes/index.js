var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("helloo every one ")
  res.send('Welcome')
});
router.post("/", (req,res)=>{
  const session = req.session;
  session.count = (session.count || 0) + 1;
  res.status(200).end("" + session.count);
})

module.exports = router;
