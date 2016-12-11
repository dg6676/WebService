/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'incorrect'){
        db.getSortedIncorrect(function(result){
           res.render('', {title: 'high incorrect rate', qList: result});
        });
        //오답율 높은 문제
    } else if(menu == 'manySolve') {
        db.getSortedNum(function(result){
           res.render('', {title: 'many people solved', qList: result});
        });
        //많이 푼 문제
    }else{
        next();
    }
});

module.exports = router;