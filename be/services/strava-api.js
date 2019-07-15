const strava = require('strava-v3');
const util = require('util');
const unirest = require('unirest');

module.exports = class Strava {
  constructor(env) {
    this.env = env;
  }

  async getUser(id) {
    const pGet = util.promisify(strava.athlete.get);
    return await pGet({
      id
    });
  }

  async getRoute(id) {
    const rGet = util.promisify(strava.routes.get);

    return await rGet({
      id
    });
  }

  async getStravaRoute(id) {

  }

  async exchangeTokens() {
    return new Promise((resolve, reject) => {
      const postData = {
        "client_id": this.env.STRAVA_CLIENT_ID,
        "client_secret": this.env.STRAVA_CLIENT_SECRET,
        "code": this.code,
        "grant_type": "authorization_code"
      };

      console.info({
        postData
      });

      unirest.post('https://www.strava.com/oauth/token')
        .headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
        .send(postData)
        .end((response) => {
          resolve(response.body);
        });
    });
  }

  async getCurrentUser() {
    const pGet = util.promisify(strava.athlete.get);
    return await pGet({});
  }

  async setCode(code) {
    this.code = code;
    return this.exchangeTokens();
  }
}