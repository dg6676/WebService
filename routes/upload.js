/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../public/scripts/dbAccess');

var storage = multer.diskStorage({
    destination: './public/images/question_image/',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

router.get('/', function(req, res, next){
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    res.render('upload_question', {title: 'upload question', l: login, msg: ''});
});

router.post('/', upload.single('uploadFile'), function(req, res, next){
    var qid = req.file.originalname.split('.')[0];
    db.getQuestion(qid, function(result){
        if(result != undefined){
            var login = 'login';
            if(req.session.userInfo != undefined){
                login = 'logout';
            }
            res.render('upload_question', {title: 'upload question', l: login, msg: '이미 존재하는 문제입니다'});
        }else{
            var date = req.body.date;
            var era = req.body.era;
            var category = req.body.category.split(',');
            var answer = req.body.answer;
            var score = req.body.score;
            console.log(req.file.originalname.split('.')[0]);
            db.insertQuestion(qid, date, era, category, answer, score);
            //db upload
            res.redirect('/upload');
        }
    });
});

module.exports = router;