// Created by szatpig at 2018/9/17.

const regist = async (ctx) => {

};

const login = async (ctx) => {
    const userName = ctx.request.body.userName;
    const userPwd = ctx.request.body.userPwd;

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
    sms
}