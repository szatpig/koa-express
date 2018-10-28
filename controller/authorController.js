// Created by szatpig at 2018/9/17.

const User = require('../models/UserModel');


const regist = async (ctx) => {
    const { mobile,password,userName } = ctx.request.body;
    // ctx.body = {
    //     mobile,
    //     password
    // };
    // console.log(req);
    const userList = await User.findOne({
        mobile
    });
    if(userList){
        ctx.body = {
            code:-1001,
            msg:'用户已存在'
        };
        return false;
    }

    const newUser = await User.create({
        mobile,
        password,
        userName
    });
    if(newUser){
        ctx.body = {
            id: newUser.id,
            mobile: newUser.mobile
        }
    }else{
        ctx.body = {
            code:-1002,
            msg:'注册失败'
        };
        return false;
    }
};

const login = async (ctx) => {
    let { userName,userPwd }= ctx.request.body;

    ctx.body = {
        userName,
        userPwd
    }
};


const sms = async (ctx) => {
    // const userMobile = ctx.request.body.userMobile;

    ctx.body = {
        smsCode: '6643'
    }
};




module.exports = {
    login,
    regist,
    sms
}