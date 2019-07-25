const DB = require('./services/db');
const db = new DB();

async function main() {
  await db.createTable('routes');
  await db.createTable('users');
}

main();