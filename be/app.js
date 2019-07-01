require('dotenv')
  .config();
const Koa = require('koa');
const Router = require('koa-router');

const koaCors = require('@koa/cors');
const router = new Router();
const app = new Koa();

const Strava = require('./strava-api');
const strava = new Strava();
//

app.use(koaCors());

// GETTERS

router.get('/user/', async (ctx, next) => {
  const id = ctx.request.query.id;
  const user = await strava.getUser(id);

  ctx.body = user;
})

router.get('/route/', async (ctx, next) => {
  const id = ctx.request.query.id;
  ctx.body = [{}];
});

router.get('/route/', async (ctx, next) => {
  ctx.body = [{}];
});

router.get('/route-comments/', async (ctx, next) => {

});

router.get('/search-routes/', async (ctx, next) => {

});

router.get('/media-gpx/', async (ctx, next) => {

});

router.get('/media-img/', async (ctx, next) => {

});

// SETTERS

// router.post('')

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('app is started on port ' + process.env.PORT);
app.listen(process.env.PORT);