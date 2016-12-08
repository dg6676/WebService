/**
 * Created by kmj on 2016-11-24.
 */
//login, join

var express = require('express');
var router = express.Router();

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'login'){
        res.render('login');
    }else if(menu == 'join'){
        res.render('signup');
    }else
        next();
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next){

});

router.post('/login', function(req, res, next){

});

module.exports = router;