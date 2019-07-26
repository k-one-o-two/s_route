const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');

const getRoutes = require('./routes/get');
const postRoutes = require('./routes/post');

app.use(koaCors());
app.use(bodyParser());

app
  .use(getRoutes.routes())
  .use(getRoutes.allowedMethods())
  .use(postRoutes.routes())
  .use(postRoutes.allowedMethods());

console.log('app is started on port ' + process.env.PORT);
app.listen(process.env.PORT);