/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
    var category = req.params.selected;
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    if(category != undefined){
        db.getList('category', function (list) {
            db.getSelectedQuestion(category, function(result){
                res.render('category_question', {title: 'category' ,cList: list, qList: result, l: login});
            });
        });
    }else next();
});

router.get('/', function (req, res) {
    var login = 'login';
    if(req.session.userInfo != undefined){
        login = 'logout';
    }
    db.getList('category', function(list){
        db.getAllQuestion(function(result){
            res.render('category_question', {title: 'category' ,cList: list, qList: result, l: login});
        });
    });
});

module.exports = router;