require('dotenv')
  .config();

const Router = require('koa-router');
const router = new Router();

const Strava = require('../services/strava-api');
const strava = new Strava(process.env);

const DB = require('../services/db');
const db = new DB({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
});

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
  const route = await db.getById('routes', ctx.request.query.id);
  ctx.body = route;
});

router.get('/route-gpx/', async (ctx, next) => {
  const id = ctx.request.query.id;
  const gpx = await strava.getGpx(id);
  ctx.body = {
    gpx
  };
});

router.get('/routes/', async (ctx, next) => {
  const routesList = await db.getIdsList('routes');
  ctx.body = routesList;
});

router.get('/route-comments/', async (ctx, next) => {});

router.get('/search-routes/', async (ctx, next) => {});

module.exports = router;