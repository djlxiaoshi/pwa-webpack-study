const Koa = require('koa');

const app = new Koa();
const Router = require('koa-router');
const koaStatic = require('koa-static');
const router = new Router();

app.use(koaStatic('./dist'));

// 处理cors跨域
router.use(async (ctx, next) => {
  const allowOrigin = ctx.request.header.origin;

  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  ctx.set('Access-Control-Allow-Origin', allowOrigin);
  ctx.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  ctx.set('Access-Control-Allow-Credentials', true);
  await next()
});

// 处理预请求
router.options('*', async (ctx, next) => {
  const allowOrigin = ctx.request.header.origin;

  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  ctx.set('Access-Control-Allow-Origin', allowOrigin);
  ctx.status = 204;
  await next();
});

router.get('/cacheFirst', (ctx, next) => {
  return ctx.body = Date.now();
});

router.get('/networkOnly', (ctx, next) => {
  return ctx.body = ctx.body = Date.now();
});

app.use(router.routes());

app.listen(3000, function () {
  console.log('app is listening on 3000')
});
