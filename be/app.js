require('dotenv')
  .config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const koaCors = require('@koa/cors');
const router = new Router();
const app = new Koa();

const Strava = require('./services/strava-api');
const strava = new Strava(process.env);
const fs = require('fs');

const DB = require('./services/db');
const db = new DB({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
});

const mockData = require('./data/mocks');

app.use(koaCors());
app.use(bodyParser());
// GETTERS

router.get('/user/', async (ctx, next) => {
  const id = ctx.request.query.id;
  const user = await strava.getUser(id);
  ctx.body = user;
})

router.get('/current-user/', async (ctx, next) => {
  const user = await strava.getCurrentUser();
  console.info({
    user
  });
  ctx.body = user;
})

router.get('/route/', async (ctx, next) => {
  const id = ctx.request.query.id;
  const selectedRoute = mockData.routes[0];
  selectedRoute.info = await strava.getRoute(selectedRoute.stravaId);
  ctx.body = selectedRoute;
});

router.get('/route-gpx/', async (ctx, next) => {
  const id = ctx.request.query.id;
  const gpx = await strava.getGpx(id);
  ctx.body = {
    gpx
  };
  // ctx.attachment(`${id}.gpx`);
});

router.get('/routes/', async (ctx, next) => {
  const fromDB = await db.get('routes');
  console.info({
    fromDB
  });
  ctx.body = fromDB;
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

router.post('/login/', async (ctx, next) => {
  const code = ctx.request.body['code'];
  console.info({
    code
  });
  if (code) {
    const currentUser = await strava.setCode(code);
    console.info({
      currentUser
    });
    ctx.body = currentUser;
  } else {
    ctx.body = null;
  }
});

router.post('/route/', async (ctx, next) => {
  const result = await db.insert('routes', [ctx.request.body]);
  ctx.body = result;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('app is started on port ' + process.env.PORT);
app.listen(process.env.PORT);