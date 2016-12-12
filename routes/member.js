/**
 * Created by kmj on 2016-11-24.
 */
//login, join

var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');
var session = require('express-session');

router.get('/:menu?', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'login'){
        res.render('login',{title:'발해', msg: ''});
    }else if(menu == 'join'){
        res.render('join',{msg: ''});
    }else
        next();
});

router.get('/', function(req, res, next) {
    res.redirect('/member/login');
});

router.post('/signup', function(req, res, next){
    var id = req.body.user_id;
    db.IDcheck(id, function(result){
       if(result != undefined)
           res.render('join', {title: '발해', msg: '존재하는 아이디입니다'});
        else{
           var name = req.body.user_name;
           var email = name;
           var pwd = req.body.user_password;
           if(pwd != req.body.user_password_comfirm){
               //비밀번호와 확인이 같지 않을 때 경고?
           }
           var birth = req.body.user_birth;
           var gender = req.body.chk_info;
           db.signup(id, pwd, name, email, birth, gender);
           res.redirect('/member/login');
       }
    });
});

router.post('/login', function(req, res, next){
    var id = req.body.email;
    var pwd = req.body.password;
    db.getUserInfo(id, pwd, function(result){
        if(result == undefined || req.session.userInfo != undefined){
            res.render('login', {title: '발해', msg: '없는 아이디거나 비밀번호가 틀렸습니다'})
        }else{
            req.session.userInfo = result;
            res.redirect('/mypage');
        }
    });
});

router.get('/logout', function(req, res, next){
   if(req.session.userInfo == undefined)
       res.redirect('/member/login');
   else{
       req.session.destroy(function(err){
           res.redirect('/');
       });
   }
});

module.exports = router;