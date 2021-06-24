const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class challengesRepository {

  async openDb() {
    return sqlite.open({
      filename: 'foodFacts.db',
      driver: sqlite3.Database
    })
  }

  async getChallenges() {
    const db = await this.openDb();
    const challenges = await db.all('SELECT * FROM challenges;');
    return challenges;
  }

}