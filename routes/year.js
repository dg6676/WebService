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
        db.getSelectedQuestion(year, function(result){
            res.render('ininig_question', {qList: result});
        });
    }else next();
});
router.get('/temp',function (req,res) {
   res.render('ininig_question');
});
router.get('/', function (req, res) {
    db.getAllQuestion(function(result){
        res.render('main_tab', {'questionList': result});
    });
});

module.exports = router;