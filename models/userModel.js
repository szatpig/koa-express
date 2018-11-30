// Created by szatpig at 2018/10/26.
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment-fix');

const userSchema = new mongoose.Schema({
    uid:{
        type: Number
    },
    mobile:{
        type:Number,
        required:[true,'手机号不能为空']
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        lowercase: true
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

// userSchema.index({ uid:1 }); //添加索引

module.exports = mongoose.model('User',userSchema);