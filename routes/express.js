// Created by szatpig at 2018/10/30.
const Router = require('koa-router');

const express =  require('./../controller/expressController');

const router =  new Router({
    prefix:'/express'
});

router.post('/search',express.search);

module.exports = router;