/**
 * Created by kmj on 2016-11-24.
 */
//login, join

var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

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
    res.redirect('/member/login');
});

router.post('/signup', function(req, res, next){
    var name = req.body.user_name;
    var id = req.body.user_id;
    var email = req.body.user_mail;
    var pwd = req.body.user_password;
    if(pwd != req.body.user_password_comfirm){
        //비밀번호와 확인이 같지 않을 때 경고?
    }
    var birth = req.body.user_birth;
    var gender = req.body.user_gender;

});

router.post('/login', function(req, res, next){

});

module.exports = router;