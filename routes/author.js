// Created by szatpig at 2018/9/17.
const Router = require('koa-router');

const author =  require('./../controller/authorController');

const router =  new Router({
    prefix:'/auth'
});

router.post('/login',author.login);
router.get('/sms',author.sms);

module.exports = router;