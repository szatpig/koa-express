// Created by szatpig at 2018/10/30.

const search = async (ctx) => {
    const { expressNum } = ctx.request.body;


    ctx.body={
        code:1,
        message:'返回成功!',
        data:{
            expressNum
        }
    }
};

module.exports = {
    search
}