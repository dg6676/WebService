/**
 * Created by Hyeon on 2016-12-01.
 */
require('./user_schema');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question'),
    UserQuestion = mongoose.model('UserQuestion');


var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/webService');


exports.signup = function(usid, pass, user_name, user_email, birth, gen){
    var user = new User();
    var userquestion = new UserQuestion();

    user.userID = usid;
    user.password = pass;
    user.name = user_name;
    user.email = user_email;
    user.birth_date = birth;
    user.gender = gen;
    userquestion.userID = usid;

    user.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(user));
        }
    });

    userquestion.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(userquestion));
        }
    });
}; // 회원가입하는 함수.

exports.getUserInfo = function(uniq_id, pwd, callback){

    User.findOne({userID: uniq_id, password: pwd}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            callback(us);
        }
    });
}; // 특정 유저 정보 가져오는 함수.

exports.getAllUserInfo = function(callback){

    User.find().exec(function(err, user){
        if(err) {
            console.log(err);
        } else{
            callback(user);
        }
    });
}; //모든 유저 정보 가져오는 함수.

exports.updateUserQuestion = function(user_id, q_id, is_correct, is_saved, callback){
    Question.findOne({qid: q_id}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            UserQuestion.update({ userID: user_id }, { $push: {questionList: [{question: us, isCorrect: is_correct, isSaved: is_saved }]} }, function(err, output){
                if(err) console.log('database failure' );

                if(!output.n) console.log('Question not found' );

            });
            callback(us);
        }
    });
}; // UserQuestion collection에서 해당 user_id 를 넣어서 찾고 거기에 특정 question을 추가하는 함수. 이게 틀렸는지 맞았는지 true, false로 넣고, 저장했는지 유무도 true, false로 넣음.

exports.getUserQuestion = function(uniq_id, callback){
    UserQuestion.findOne({userID: uniq_id}, function(err, docs){
        var list = [];
        if(err){
            console.log(err);
        }else{
            var qList = docs.questionList;
            for(var i = 0; i < qList.length; i++){
                if(qList.isSaved == true){
                    list.push(qList[i].question);
                }
            }
        }
        callback(list);
    });
}; //문제집으로 추가 된 문제만 불러온다.


exports.getUserIncorrectQuestion = function(user_id, callback){
    UserQuestion.findOne({userID: user_id}, function(err, docs){
        var list = [];
        if(err){
            console.log(err);
        }else{
            var qList = docs.questionList;
            for(var i = 0; i < qList.length; i++){
                if(qList.isCorrect == false){
                    list.push(qList[i].question);
                }
            }
        }
        callback(list);
    });
}; //사용자 오답 리스트


exports.insertQuestion = function (qid, date, era, category, answer, score) {
    var question = new Question();
    question.qid = qid;
    question.date = date;
    question.era = era;
    question.category = category;
    question.answer = answer;
    question.score = score;
    question.incorrect_rate = 0;
    question.num_solved= 0;

    question.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(question));
        }
    });
}; //문제 collection에 문제 추가하는 함수.

exports.getQuestion = function(qid, callback){
    Question.findOne({qid: qid}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            callback(us);
        }
    });
}; // 문제 id 입력하면 그 문제 정보만 가져오는 함수.

exports.getAllQuestion = function(callback){

    Question.find().exec(function(err, qlist){
        var list = [];
        if(err) {
            console.log(err);
        } else{
            for(var i = 0; i < qlist.length; i++){
                list.push(qlist[i].qid);
            }
            callback(list);
        }
    });
}; // 모든 문제 가져오는 함수.

exports.getSortedIncorrect = function(callback){

    Question.find().sort('-incorrect_rate').exec(function(err, qlist){
        if(err) {
            console.log(err);
        } else{
            var list = [];
            for(var i = 0; i < qlist.length; i++){
                list.push(qlist[i].qid);
            }
            callback(list);
        }
    });
}; // 전체 문제에서 오답률 가장 높은 문제 출력하는 함수.

exports.getSortedNum = function(callback){

    Question.find().sort('-num_solved').exec(function(err, qlist){
        if(err) {
            console.log(err);
        } else{
            var list = [];
            for(var i = 0; i < qlist.length; i++){
                list.push(qlist[i].qid);
            }
            callback(list);
        }
    });
};//전체 문제에서 푼 사람 수가 높은 문제 출력

exports.updateQuestionState = function(q_id, inc, callback){
    Question.findOne({qid: q_id}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            if(inc)
                us.incorrect_rate++;
            us.num_solved++;
            us.save(function(err){
                if(err) {
                    console.log(err);
                } else {

                }
            });
            callback(us);
        }
    });
}; //오답률 및 푼 사람 수 update. 문제 id 넣으면 그문제 정보에 틀린 사람수, 푼 사람 수 +1 하는 함수.



exports.getSelectedQuestion = function(tag, callback){

    Question.find( {$or: [ {era: tag}, {category: tag}, {date: tag}] }).exec(function(err, qlist){
        if(err) {
            console.log(err);
        } else{
            var list = [];
            for(var i = 0; i < qlist.length; i++){
                list.push(qlist[i].qid);
            }
            callback(list);
        }
    });
}; //카테고리 별 문제. tag에 시대, 카테고리, 날짜 셋 중 하나 넣으면 그에 맞는 문제 전부 출력해주는 함수.

exports.getList = function(list_name, callback){
    Question.find().distinct(list_name).exec(function(err,qlist){
       if(err){
           console.log(err);
       } else{
           callback(qlist);
       }
    });
}; //category, era, date 이 3가지 중 하나 딱 저거 'category' 라고 넣어야 함. 넣으면 뭐 있는지 리스트 출력 함수.
