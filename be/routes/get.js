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
  const localUser = await db.getByRowValue('users', 'stravaId', user.id);

  user.stravaId = user.id;
  if (localUser[0]) {
    user.id = localUser[0].id;

    const updateRes = await db.updateByRowValue('users', 'stravaId', user.stravaId, {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
      state: user.state,
      country: user.country,
      sex: user.sex,
      summit: user.summit,
      profile_medium: user.profile_medium,
      profile: user.profile
    });
  }

  ctx.body = user;
})

router.get('/route/', async (ctx, next) => {
  const route = await db.getById('routes', ctx.request.query.id);
  ctx.body = route;
});

router.get('/strava-route/', async (ctx, next) => {
  const stravaId = ctx.request.query.id;
  const route = await strava.getRoute(stravaId)
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

router.get('/route-comments/', async (ctx, next) => {
  const routeId = ctx.request.query.routeId;

  const commentsList = await db.getComments(routeId);
  ctx.body = commentsList;
});

router.get('/search-routes/', async (ctx, next) => {});

module.exports = router;