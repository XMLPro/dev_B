var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("chat cooming");
  res.render('chat', { title: 'chat' });
});

module.exports = router;
