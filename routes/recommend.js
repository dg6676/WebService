/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../public/scripts/dbAccess');

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'incorrect'){
        //오답율 높은 문제
    } else if(menu == 'manySolve') {
        //많이 푼 문제
    }else{
        next();
    }
});

module.exports = router;