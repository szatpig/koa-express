const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const koaJwt = require('koa-jwt');
const json = require('koa-json');
const config = require('./config');
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger');
require('./config/db');


const route = require('./routes');
const InterfaceBuffer = require('./lib/InterfaceHelper');


// error handler
onError(app);


// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.response.body = {
            code:ctx.status,
            message: err.message
        };
    }
});


app.use(InterfaceBuffer('^/api'));

app.use(koaJwt({
    secret:config.secret
}).unless({
    path: [/\/regist/, /\/login/],
}));

// middlewares
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));




app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// routes
app.use(route.routes()).use(route.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
