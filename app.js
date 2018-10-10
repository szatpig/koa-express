const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const jwt = require('koa-jwt');
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')


const route = require('./routes');
const InterfaceBuffer = require('./lib/InterfaceHelper');


// error handler
onError(app)

// middlewares
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

app.use(InterfaceBuffer('^/api'));

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        throw new Error(err);
        // logger.error(`${err.status} -- ${err.message}\n${err.stack}`)
    }
});

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        // ctx.throw(400, 'name required');
        console.log(ctx.status);
        ctx.body = '404 No Found';
    }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(route.routes()).use(route.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
