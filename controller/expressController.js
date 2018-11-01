// Created by szatpig at 2018/10/30.

const fly=require("flyio");
const config = require('./../config');
const md5 = require('md5');
const encoding = require('encoding')

const search = async (ctx) => {
    const { expressNum } = ctx.request.body;
    try {
        let _data = await fly.get('http://www.kuaidi100.com/autonumber/auto?num='+ expressNum +'&key='+config.express_key,null,{
            headers:{'Content-Type':'application/json;charset=utf-8'},
            parseJson:true,
        });
        if(_data.data.length >0 ){
            let com = JSON.parse(_data.data)[0].comCode;
            let param = {
                com,
                num:expressNum,
                from:"",
                to:"",
                resultv2:0
            };
            console.log(param);
            let sign = md5(JSON.stringify(param) + config.express_key + config.express_customer).toUpperCase();

            // console.log(sign);
            //
            // let expressData = await fly.get('https://poll.kuaidi100.com/poll/query.do',{
            //     customer:config.express_customer,
            //     sign,
            //     param:JSON.stringify(param).toString()
            // });

            let RequestData = {"OrderCode": "","ShipperCode": "SF", "LogisticCode": "118650888018"};
            let DataSign = md5(JSON.stringify(RequestData) + config.kd_key);
            console.log(DataSign,'DataSign');
            let _code =  encoding.convert(new Buffer(DataSign),'Base64','UTF-8');
            let code =  encoding.convert(new Buffer(_code),'UTF-8','Base64');

            let kdnData = await fly.post('http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',{
                RequestType:"1002",
                EBusinessID:'1397624',
                DataSign:'MTJkZTkwNGQ0NjkyOGYyMTY2NDdmZTVlMWIxZjJlNDA=',
                RequestData:RequestData
            },{
                headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
                parseJson:true,
            });

            // console.log(kdnData);

            ctx.body={
                code:1,
                message:'返回成功!',
                data: JSON.parse(kdnData.data)
            }
        }else{
            ctx.body={
                code:-1010,
                message:'未追踪到单号相关信息!'
            }
        }

    }catch (e) {
        ctx.throw(500,'第三方服务请求错误');
    }
    // let _data = await
    // fly.get('https://www.kuaidi100.com/autonumber/auto?num='+ expressNum +'&key='+ config.express_key).then(data => {
    //     console.log(data.data);
    //     ctx.body={
    //         code:1,
    //         message:'返回成功!',
    //         data:{
    //             data
    //         }
    //     }
    // }).catch(e=>{
    //      ctx.throw(500,'第三方服务请求错误')
    // })

    // ctx.body={
    //     code:1,
    //     message:'返回成功!',
    //     data:{
    //         expressNum
    //     }
    // }



    // let expressData = await fly.post('https://wx.ynt.ai/wechat/auth/login',{
    //     "email":"zhaot@126.com",
    //     "password":"123456",
    //     "code":"081dW7460xrsmJ1c23560HtW360dW74L"
    // });
    // // console.log(expressData.data);

    // ctx.body={
    //     code:1,
    //     message:'返回成功!',
    //     data:expressData.data
    // }

};

module.exports = {
    search
}