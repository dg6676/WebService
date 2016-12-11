/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
   var year = req.params.selected;
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    if(year != undefined){
        db.getList('year', function(list){
            db.getSelectedQuestion(year, function(result){
                res.render('ininig_question', {title: 'year', yList: list, qList: result, l: login});
            });
        });
    }else next();
});

router.get('/', function (req, res) {
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    db.getList('year', function(list){
        db.getAllQuestion(function(result){
            res.render('ininig_question', {title: 'year', yList: list, 'questionList': result, l: login});
        });
    });
});

module.exports = router;