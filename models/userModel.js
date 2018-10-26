// Created by szatpig at 2018/10/26.
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment-fix');

const userSchema = mongoose.Schema({
    uid:{
        type:Number,
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    openId:String,
    avatar:String,
    date:{
        type:Date,
        default:Date.now()
    }
}, {
    collection: 'User'
});

module.exports = mongoose.model('User',userSchema);