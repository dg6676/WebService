/**
 * Created by kmj on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');
var session = require('express-session');

router.get('/:menu?', function(req, res, next){
    var menu = req.params.menu;
    if(req.session.userInfo == undefined){
        res.redirect('/member/login');
    }
    if(menu == 'incorrect'){
        db.getUserIncorrectQuestion(req.session.userInfo.userID, function(list){
            res.render('', {'title': 'user incorrect list', qList: list, l: 'logout'});
        });
    }else if(menu == 'myquestion'){
        db.getUserQuestion(req.session.userInfo.userID, function(list){
            res.render('', {'title': 'user question', qList: list, l: 'logout'});
        });
    }else next();
});

router.get('/', function(req, res, next) {
    if(req.session.userInfo == undefined){
        res.redirect('/member/login');
    }
    res.render('myPage', {l:'logout'});
});

router.post('/', function(req, res, next){
   //회원 정보 수정
});

module.exports = router;