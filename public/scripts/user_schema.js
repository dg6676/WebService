var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    qid: String,
    date: String,
    era: String,
    category: [ String ],
    answer: Number,
    score: Number,
    incorrect_rate: Number,
    num_solved: Number
}, {collection: 'questions'});

module.exports = mongoose.model('Question', QuestionSchema);


var UserSchema = new Schema({
    userID: String,
    password: String,
    name: String,
    email: String,
    birth_date: String,
    gender: String
}, {collection: 'users'});

module.exports = mongoose.model('User', UserSchema);

var UserQuestionSchema = new Schema({
    userID: String,
    questionList: [
        {
            question: QuestionSchema,
            isCorrect: Boolean,
            isSaved: Boolean
        }
    ]
}, {collection: 'user_question'});

module.exports = mongoose.model('UserQuestion', UserQuestionSchema);

