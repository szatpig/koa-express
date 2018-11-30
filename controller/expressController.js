// Created by szatpig at 2018/10/30.

const config = require('./../config');
const request = require('request-promise');

const search = async (ctx) => {
    const { expressNum } = ctx.request.body;
    try {

        let _data = await request.post('http://api.shujuzhihui.cn/api/sjzhApi/searchExpress',{
            form:{
                appKey:'823aad46c6b34d25b020dc9a49352d3d',
                expressNo:expressNum
            }
        }) ;

        // let url = 'http://q.kdpt.net/api?id=XDB2g2sjbns211ow969aNo0I_1304485196&com=auto&nu='+expressNum;
        // let _data = await request.get(url);

        let data = JSON.parse(_data);

        console.log(data)

        if(data.ERRORCODE == 0 && data.RESULT.context.length > 0 ){
            ctx.body={
                code:1,
                message:'操作成功!',
                data: data.RESULT
            }
        }else{
            let flag = true;
            let kuaidiCom = await request.get('http://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text='+expressNum);
            let _list = JSON.parse(kuaidiCom).auto;
            console.log(_list);
            if(_list.length > 0) {
                let kuaiInfo = await request.get('http://www.kuaidi100.com/query?type='+_list[0].comCode+'&postid='+expressNum);
                let kuaiDiInfo = JSON.parse(kuaiInfo);
                console.log(kuaiDiInfo);
                if(kuaiDiInfo.status == 200){
                    flag = false;
                    ctx.body={
                        code:1,
                        message:'操作成功!',
                        data: kuaiDiInfo.data
                    }
                }
            }

            if(flag){
                ctx.body={
                    code:-1010,
                    message:'未追踪到单号相关信息!'
                }
            }

        }

    }catch (e) {
        ctx.throw(500,'第三方服务请求错误');
    }
};

module.exports = {
    search
}