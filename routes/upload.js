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
    res.render('upload_question', {title: 'upload question'});
});

router.post('/', upload.single('uploadFile'), function(req, res, next){
    var qid = req.file.originalname.split('.')[0];
    var date = req.body.date;
    var era = req.body.era;
    var category = req.body.category.split(',');
    var answer = req.body.answer;
    var score = req.body.score;
    console.log(req.file.originalname.split('.')[0]);
    db.insertQuestion(qid, date, era, category, answer, score);
    //db upload
    res.redirect('/upload');
});

module.exports = router;