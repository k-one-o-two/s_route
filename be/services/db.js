const r = require('rethinkdb');
const util = require('util');

module.exports = class DB {
  constructor(config) {
    this.port = config.port;
    this.host = config.host;
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    } else {
      const pConn = util.promisify(r.connect);
      this.connection = await pConn({
        host: this.host,
        port: this.port
      });
      return this.connection;
    }
  }

  async createTable(name) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.db('test')
        .tableCreate(name)
        .run(this.connection, (err, result) => {
          if (err) reject(err);

          resolve(result);
        });
    })
  }

  async insert(table, data) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .insert(data)
        .run(this.connection, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
    })
  }

  async get(table) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .run(this.connection, (err, cursor) => {
          if (err) reject(err);

          cursor.toArray(function(err, result) {
            if (err) reject(err);

            resolve(result);
          });
        })
    })
  }
}