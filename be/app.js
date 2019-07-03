require('dotenv')
  .config();
const Koa = require('koa');
const Router = require('koa-router');

const koaCors = require('@koa/cors');
const router = new Router();
const app = new Koa();

const Strava = require('./services/strava-api');
const strava = new Strava();
const fs = require('fs');

const mockData = require('./data/mocks');


app.use(koaCors());

// GETTERS

router.get('/user/', async (ctx, next) => {
  const id = ctx.request.query.id;
  console.info({
    id
  });
  const user = await strava.getUser(id);
  console.info({
    user
  });
  ctx.body = user;
})

router.get('/route/', async (ctx, next) => {
  const id = ctx.request.query.id;
  ctx.body = mockData.routes[0];
});

router.get('/routes/', async (ctx, next) => {
  ctx.body = mockData.routes;
});

router.get('/route-comments/', async (ctx, next) => {
  ctx.body = mockData.comments;
});

router.get('/search-routes/', async (ctx, next) => {

});

router.get('/media-gpx/', async (ctx, next) => {
  const name = ctx.request.query.name;
  const path = __dirname + '/data/gpxStorage/' + name + '.gpx';
  ctx.body = fs.createReadStream(path);
  ctx.attachment(name + '.gpx');
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