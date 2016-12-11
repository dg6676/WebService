var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var login = 'login';
  if(req.session.userInfo != undefined){
    login = 'logout';
  }
  res.render('main_tab', { title: 'Express', l: login });
});

module.exports = router;
