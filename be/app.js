require('dotenv')
  .config();
const Koa = require('koa');
const Router = require('koa-router');

const koaCors = require('@koa/cors');
const router = new Router();
const app = new Koa();

app.use(koaCors());

router.get('/routes/', async (ctx, next) => {
  ctx.body = [{}];
})

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('app is started on port ' + process.env.PORT);
app.listen(process.env.PORT);