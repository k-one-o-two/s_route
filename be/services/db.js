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

  async cleanTable(name) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(name)
        .delete()
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

  async getById(table, id) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .get(id)
        .run(this.connection, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
    })
  }

  async getIdsList(table) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .pluck('id')
        .run(this.connection, (err, cursor) => {
          if (err) reject(err);

          cursor.toArray(function(err, result) {
            if (err) reject(err);

            resolve(result);
          });
        })
    })
  }

  async getAllData(table) {
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

  async getByRowValue(table, row, value) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .filter(r.row(row)
          .eq(value))
        .run(this.connection, (err, cursor) => {
          if (err) reject(err);

          cursor.toArray(function(err, result) {
            if (err) reject(err);

            resolve(result);
          });
        })
    })
  }

  async updateByRowValue(table, row, value, updateObj) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table(table)
        .filter(r.row(row)
          .eq(value))
        .update(updateObj)
        .run(this.connection, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
    })
  }


  // app specific methods
  async getComments(routeId) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.table('comments')
        .filter(r.row('routeId')
          .eq(routeId))
        .eqJoin("userId", r.table("users"))
        .zip()
        .run(this.connection, (err, cursor) => {
          if (err) reject(err);

          cursor.toArray((err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        })
    })
  }
}