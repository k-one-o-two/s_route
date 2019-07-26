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
  const route = ctx.request.body;
  const gpx = await strava.getGpx(route.stravaId);
  route.gpx = gpx;

  const result = await db.insert('routes', [route]);
  ctx.body = result;
});

module.exports = router;