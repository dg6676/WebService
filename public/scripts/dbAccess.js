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


exports.signup = function(user_name, usid, pass, user_email, birth, gen){
    var user = new User();
    user.userID = usid;
    user.password = pass;
    user.email = user_email;
    user.birth_date = birth;
    user.name = user_name;
    user.gender = gen;

    user.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(user));
        }
    });
};

exports.getUserInfo = function(uniq_id, pwd, callback){
    User.findOne({userID: uniq_id, password: pwd}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            callback(us);
        }
    });
};

exports.getAllUserInfo = function(callback){

    User.find().exec(list = function(err, user){
        if(err) {
            console.log(err);
        } else{
            callback(user);
        }
    });
};

exports.updateUserQuestion = function(uniq_id, q_id, callback){
    Question.findOne({qid: q_id}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            User.update({ userID: uniq_id }, { $push: {questionList: {question: us, isCorrect: false}} }, function(err, output){
                if(err) console.log('database failure' );

                if(!output.n) console.log('book not found' );

            });
            callback(us);
        }
    });
}; //수정 필요 -> collection 변경 및 오답이어서 추가 되었는 지 문제집에 추가해서 추가되었는 지 확인해서 isCorrect와 isSaved 구분 확인

exports.getUserQuestion = function(uniq_id, callback){
    UserQuestion.findOne({'userID': uniq_id}, function(err, docs){
        var list = [];
        if(err){
            console.log(err);
        }else{
            var qList = docs.questionList;
            for(var i = 0; i < qList.length; i++){
                if(qList.isSaved == false){
                    list.push(qList[i].question);
                }
            }
        }
        callback(list);
    });

}; //문제집으로 추가 된 문제만 불러온다

exports.getUserIncorrectQuestion = function(user_id, callback){
    UserQuestion.findOne({'userID': user_id}, function(err, docs){
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
};

exports.getQuestion = function(qid, callback){
    Question.findOne({qid: qid}, function(err, us){
        if(err) {
            console.log(err);
        } else {
            callback(us);
        }
    });
};

exports.getAllQuestion = function(callback){
    Question.find().exec(list = function(err, qlist){
        if(err) {
            console.log(err);
        } else{
            callback(qlist);
        }
    });
};

exports.getIncorrectQuestion = function(callback){
    Question.find().exec(list = function(err, qlist){
        var qList = [];
        if(err){
            console.log(err);
        }else{
            qlist.sort(function(a, b){
                return a.incorrect_rate - b.incorrect_rate;
            });
            qlist.reverse();
            for(var i = 0; i < qlist.length; i++){
                if(qlist.incorrect_rate > 50)
                    qList.push(qlist[i].qid);
                else break;
            }
        }
        callback(qList);
    });
};//오답률 높은 문제

//오답률 및 푼 사람 수 update