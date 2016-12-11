/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
   var year = req.params.selected;
    if(year != undefined){
        db.getList('year', function(list){
            db.getSelectedQuestion(year, function(result){
                res.render('', {yList: list, qList: result});
            });
        });
    }else next();
});

router.get('/', function (req, res) {
    db.getList('year', function(list){
        db.getAllQuestion(function(result){
            res.render('main', {yList: list, 'questionList': result});
        });
    });
});

module.exports = router;