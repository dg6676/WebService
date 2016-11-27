/**
 * Created by kmj on 2016-11-24.
 */
//login, join

var express = require('express');
var router = express.Router();

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'login'){
        res.render('login', { title: 'Express' });
    }else if(menu == 'join'){
        res.render('signup', { title: 'Express' });
    }else
        next();
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;