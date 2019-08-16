require('dotenv')
  .config();

const DB = require('./services/db');
const db = new DB({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST
});

async function main() {
  // await db.createTable('routes');
  await db.cleanTable('comments');
}

main();