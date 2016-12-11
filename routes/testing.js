/**
 * Created by jeongyeon on 2016-12-11.
 */
/**
 * 페이지 테스트용 라우터입니다.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');


router.get('/',function (req,res) {
    res.render('ininig_question',{'title':"발해"});
});
router.get('/category',function (req,res) {
    res.render('category_question',{'title':"발해"});
});

router.get('/era',function (req,res) {
    res.render('period_question',{'title':"발해"});
});

router.get('/upload',function(req,res){
    res.render('upload_question');
});

router.get('/solve',function(req,res){
    res.render('solve_question');
});
module.exports = router;