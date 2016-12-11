var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main_tab', { title: 'Express' });
  console.log("hello index.js");
});

module.exports = router;
