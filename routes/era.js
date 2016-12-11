/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
    var era = req.params.selected;
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    if(era != undefined){
        db.getList('era', function (list) {
            db.getSelectedQuestion(era, function(result){
                res.render('period_question', {title: 'era', eList: list, qList: result, l:login});
            });
        });
    }else next();
});

router.get('/', function (req, res) {
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    db.getList('era', function(list){
        db.getAllQuestion(function(result){
            res.render('period_question', {title: 'era', eList: list, 'questionList': result, l: login});
        });
    });
});

module.exports = router;