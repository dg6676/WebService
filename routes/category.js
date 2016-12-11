/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
    var category = req.params.selected;
    if(category != undefined){
        db.getList('category', function (list) {
            db.getSelectedQuestion(category, function(result){
                res.render('category_question', {title: 'category' ,cList: list, qList: result});
            });
        });
    }else next();
});

router.get('/', function (req, res) {
    db.getList('category', function(list){
        db.getAllQuestion(function(result){
            console.log(JSON.stringify(list));
            console.log(JSON.stringify(result));
            res.render('category_question', {title: 'category' ,cList: list, qList: result});
        });
    });
});

module.exports = router;