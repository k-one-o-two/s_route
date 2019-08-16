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
  if (code) {
    const responce = await strava.setCode(code);
    const currentUser = responce.athlete;

    let uid;

    // check if exists
    const alreadySavedUser = await db.getByRowValue('users', 'stravaId', currentUser.id);
    if (alreadySavedUser.length) {
      // update
      // await db.updateByRowValue()
      ctx.body = {
        ...alreadySavedUser[0]
      };
    } else {
      currentUser.stravaId = currentUser.id;
      delete currentUser.id;
      const result = await db.insert('users', [currentUser]);

      uid = result.generated_keys[0];

      ctx.body = {
        id: uid,
        ...currentUser
      };
    }
  } else {
    ctx.body = null;
  }
});

router.post('/touch/', async (ctx) => {
  const currentUser = await strava.getCurrentUser();
});

router.post('/logout/', async (ctx, next) => {
  // what for?
});

router.post('/route/', async (ctx, next) => {
  const route = ctx.request.body;
  const gpx = await strava.getGpx(route.stravaId);
  route.gpx = gpx;

  const result = await db.insert('routes', [route]);
  ctx.body = result;
});

router.post('/route-comments/', async (ctx, next) => {
  const comment = ctx.request.body;
  comment.timestamp = new Date();
  let result;
  result = await db.insert('comments', [comment]);
  ctx.body = result;
});

module.exports = router;