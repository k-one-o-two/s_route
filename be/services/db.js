const r = require('rethinkdb');
const util = require('util');

const DB_NAME = 'test';

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

  async cleanDb() {
    await this.connect();

    let dropResult;
    try {
      dropResult = await r.dbDrop(DB_NAME)
        .run(this.connection, () => {});
    } catch (e) {
      console.log(e);
    }

    return r.dbCreate(DB_NAME)
      .run(this.connection, (res) => {
        console.log(`database ${DB_NAME} was created`);
      });
  }

  async createTable(name) {
    await this.connect();

    return new Promise((resolve, reject) => {
      r.db(DB_NAME)
        .tableCreate(name)
        .run(this.connection, (err, result) => {
          if (err) reject(err);

          console.log(`table ${name} was created`);
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