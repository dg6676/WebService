/**
 * Created by jeongyeon on 2016-12-11.
 */
/**
 * 페이지 테스트용 라우터입니다.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');

router.get('/', function(req, res){
    req.flash('test', 'worked');
    res.redirect('/temp/test');
});

router.get('/test', function (req, res) {
   res.send('<script type="text/javascript">alert(JSON.stringify(req.flash("#{test}")))</script>');
});

module.exports = router;