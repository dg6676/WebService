/**
 * Created by kmj on 2016-11-24.
 */
//login, join

var express = require('express');
var router = express.Router();

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'login'){

    }else if(menu == 'join'){

    }else
        next();
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;