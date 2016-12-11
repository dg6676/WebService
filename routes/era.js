/**
 * Created by kmj on 2016-12-11.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../public/scripts/dbAccess');

router.get('/:selected?', function(req, res, next){
    var era = req.params.selected;
    if(era != undefined){
        db.getSelectedQuestion(era, function(result){
            res.render('', {qList: result});
        });
    }else next();
});

router.get('/', function (req, res) {
    db.getAllQuestion(function(result){
        res.render('main', {'questionList': result});
    });
});

module.exports = router;