/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    if(menu == 'incorrect'){
        db.getSortedIncorrect(function(result){
           res.render('high_incorrect_rate', {title: 'high incorrect rate', qList: result, l: login});
        });
        //오답율 높은 문제
    } else if(menu == 'manySolve') {
        db.getSortedNum(function(result){
           res.render('many_people_solved', {title: 'many people solved', qList: result, l: login});
        });
        //많이 푼 문제
    }else{
        next();
    }
});

module.exports = router;