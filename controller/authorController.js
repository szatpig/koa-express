// Created by szatpig at 2018/9/17.

const bcrypt  = require('bcrypt');
const User = require('../models/UserModel');
const tokenHelper = require('./../lib/tokenHelper');


const regist = async (ctx) => {
    const { mobile,password,userName } = ctx.request.body;

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

    //生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    let hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
        mobile,
        password:hash,
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
    let { mobile,password }= ctx.request.body;
    try{
        if(!mobile || !password){
            ctx.body = {
                code: -4000,
                message:'参数错误!'
            };
            return false;
        }

        let userList = await User.findOne({
            mobile
        });

        if(!userList){
            ctx.body = {
                code:-1003,
                msg:'用户名错误'
            };
            return false;
        }
        // console.log(userList,password,userList.password,bcrypt.compare(password,userList.password));

        if(!await bcrypt.compare(password,userList.password)){
            ctx.body = {
                code:-1004,
                msg:'密码错误'
            };
            return false;
        }

        let _token = {
            mobile
        };

        ctx.body = {
            code:1,
            message:'登录成功',
            data:{
                token: tokenHelper.crateToken(_token)
            }
        }

    }catch(e){
        console.log(e)
        ctx.response.status = 500;
        ctx.body = {
            code:-5000,
            message:'系统错误'
        }
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