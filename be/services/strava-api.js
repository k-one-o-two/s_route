const strava = require('strava-v3');
const util = require('util');

module.exports = class Strava {

  async getUser(id) {
    const pGet = util.promisify(strava.athlete.get);
    return await pGet({
      id
    });
  }

  async getStravaRoute(id) {

  }
}