require('dotenv')
  .config();

const DB = require('./services/db');
const db = new DB({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
});

async function main() {
  await db.cleanDb();

  await db.createTable('routes');
  await db.createTable('comments');
  await db.createTable('users');

  console.log('all set up, exiting...');
  process.exit(0);
}

main();