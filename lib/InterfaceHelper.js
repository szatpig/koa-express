// Created by szatpig at 2018/9/17.
// let InterfaceBuffer = new class{
//
// };

const ErrorHelper =  require('./ErrorHelper');

let handleResponse = async (ctx) => {
    if(ctx.body){
        if(ctx.body.code == 1){
            ctx.body = {
                code: 1,
                message: ctx.body.message,
                data: ctx.body.data
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: ctx.body.message
        }
    }
};

let InterfaceBuffer = (pattern) => {
    return async (ctx, next) =>{
        let reg = new RegExp(pattern);
        try {
            //先去执行路由
            await next();
            //通过正则的url进行格式化处理
            if(ctx.status != 404){
                handleResponse(ctx);
            }else{
                // ctx.status = 200;
                ctx.body = {
                    code: 404,
                    msg: ctx.message || ctx.msg
                }
            }
        } catch (error) {
            //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if(error instanceof ErrorHelper && reg.test(ctx.originalUrl)){
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    msg: error.msg
                }
            }
            //继续抛，让外层中间件处理日志
            throw error;
        }
    }
};


module.exports = InterfaceBuffer;