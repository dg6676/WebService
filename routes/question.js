/**
 * Created by kmj on 2016-11-24.
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

/* GET home page. */
router.get('/:menu?/:selected?', function(req, res, next) {
    var menu = req.params.menu;
    var selectedQid = req.params.selected;
    if(menu == 'description'){
        db.getQuestion(selectedQid, function(result){
            res.render('', {'qid': result.qid, 'date': result.date, 'era': result.era, 'category': result.category, 'answer': result.answer, 'score': result.score, 'incorrect_rate': result.incorrect_rate, 'num_solved': num_solved});
        });
        //문제 상세 출력
    } else if(menu == 'solve') {
        //문제 풀기 화면
        db.getQuestion(selectedQid, function(result){
            res.render('', {'qid': result.qid, 'date': result.date, 'era': result.era, 'category': result.category, 'answer': result.answer, 'score': result.score, 'incorrect_rate': result.incorrect_rate, 'num_solved': num_solved});
        });
    }else{
        next();
    }
});

router.get('/',function(res, req, next){
    //err
});

router.post('/solve', function(req, res){
    //오답률 update & 문제를 푼 사람 수 update
});

module.exports = router;