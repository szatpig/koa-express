// Created by szatpig at 2018/9/14.
const Router = require('koa-router');


const router = new Router({
    prefix:'/api'
});

const author = require('./author');

router.use(author.routes(),author.allowedMethods());

module.exports = router;