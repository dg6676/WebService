/**
 * Created by kmj on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: './public/images/question_image/',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

/* GET home page. */
router.get('/:menu?/:selected', function(req, res, next) {
    var menu = req.params.menu;
    if(menu == 'year'){ //연도별 문제 출력 (/question/year/:selectedYear)
        var yearList = []; //db에 저장되어 있는 문제들의 연도 리스트
        var selectedYear = req.params.selected;
        if(selectedYear==null || selectedYear=="" || selectedYear==undefined)
        {
            //전체 리스트로 렌더링
        }else{
            var year_questionList = []; //해당 연도의 문제 리스트
            //연도별 문제 출력
        }
    }else if(menu == 'category'){ //유형별 문제 출력
        var categoryList = []; //db에 저장되어 있는 문제들의 유형 리스트
        var selectedCategory = req.params.selected;
        if(selectedCategory==null || selectedCategory=="" || selectedCategory==undefined)
        {
            //전체 리스트로 렌더링
        }else{
            var category_questionList = []; //해당 유형의 문제 리스트
            //유형별 문제 출력
        }
    }else if(menu == 'incorrect'){ //오답률 높은 문제 출력
        var incorrectQuestions = []; //오답률이 높은 문제 리스트
        var incorrectLateList = []; //오답률 리스트
        //오답률 높은 문제 출력
    }else if(menu == 'upload'){
        //upload 화면 렌더링
    }else if(menu == 'description'){
        //문제 상세 출력
    } else {
        next();
    }
});

router.get('/',function(res, req, next){
    //err
});

router.post('/upload', upload.single('uploadFile'), function(req, res, next){
    res.redirect('/upload');
});

module.exports = router;