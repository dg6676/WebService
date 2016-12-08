/**
 * Created by Hyeon on 2016-12-01.
 */
require('./user_schema');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question');


var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/webService');


exports.signup = function(usid, pass, user_email, birth, gen){
    var user = new User();
    user.userID = usid;
    user.password = pass;
    user.email = user_email;
    user.birth_date = birth;
    user.gender = gen;

    user.save(function(err){
        if(err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(user));
        }
    });
};

exports.getUserInfo = function(uniq_id, callback){

    User.findOne({userID: uniq_id}, function(err, us){
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
};

exports.getUserQuestion = function(uniq_id, callback){
    User.findOne({userID: uniq_id}, function(err, us){
        if(err) {
            console.log(err);
        } else {
           // console.log(JSON.stringify((us)));
            callback(us);
        }
    });

};

exports.insertQuestion = function (qid, date, era, category, answer, score, incorrect, solved) {
    var question = new Question();
    question.qid = qid;
    question.date = date;
    question.era = era;
    question.category = category;
    question.answer = answer;
    question.score = score;
    question.incorrect_rate = incorrect;
    question.num_solved= solved;

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
