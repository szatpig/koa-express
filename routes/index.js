// Created by szatpig at 2018/9/14.
const Router = require('koa-router');


const router = new Router({
    prefix:'/api'
});

const author = require('./author');
const express = require('./express');

router.use(author.routes(),author.allowedMethods());
router.use(express.routes(),express.allowedMethods());

module.exports = router;