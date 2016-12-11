/**
 * Created by kmj on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

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

router.post('/solve/:qid/:wrong?', function(req, res){
    var wrong = true;
    if(req.params.wrong == 'false')
        wrong = false;
    db.updateQuestionState(req.params.qid, wrong, function () {
        if(req.session.userInfo != undefined && wrong){
            db.getUserQuestion(req.session.userInfo.userID, function(list){
                var exist = false;
                for(var i = 0; i < list.length; i++){
                    if(list[i] == req.params.qid){
                        exist = true;
                        break;
                    }
                }
                if(exist){
                    db.updateUserQuestion(req.session.userInfo.userID, req.params.qid, 'false', 'true', function(){
                        res.redirect('/question/description/'+req.params.qid);
                    });
                }else{
                    db.updateUserQuestion(req.session.userInfo.userID, req.params.qid, 'false', 'false', function(){
                        res.redirect('/question/description/'+req.params.qid);
                    });
                }
            });
        }else{
            res.redirect('/question/description/'+req.params.qid);
        }
    });
    //오답률 update & 문제를 푼 사람 수 update
});

router.post('/save/:qid', function(req, res){
    db.getUserIncorrectQuestion(req.session.userInfo.userID, function (list) {
        var exist = false;
        for(var i = 0; i < list.length; i++){
            if(list[i] == req.params.qid){
                exist = true;
                break;
            }
        }
        if(exist){
            db.updateUserQuestion(req.session.userInfo.userID, req.params.qid, 'false', 'true', function(){
                res.redirect('/category');
            });
        }else{
            db.updateUserQuestion(req.session.userInfo.userID, req.params.qid, 'true', 'true', function(){
                res.redirect('/category');
            });
        }
    });
});

module.exports = router;