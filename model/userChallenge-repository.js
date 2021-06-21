const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserChallengeRepository {

    async openDb() {
        return sqlite.open({
            filename: 'userChallenges.db',
            driver: sqlite3.Database
        })
    }

    async init() {
        const db = await this.openDb();
        await db.exec('DROP TABLE IF EXISTS userChallenges');
    }

    async setUserChallenge(challengeId) {
        console.log(challengeId);
        const db = await this.openDb();
        await db.exec('CREATE TABLE IF NOT EXISTS userChallenges (id INTEGER PRIMARY KEY AUTOINCREMENT, challengeId Text NOT NULL);');
        await db.run('INSERT INTO userChallenges(challengeId) VALUES (?)', [challengeId,]);
    }

    async getUserChallenges() {
        const db = await this.openDb();
        const userChallenges = await db.all('SELECT * FROM userChallenges;');
        console.log(userChallenges);
        return userChallenges;
      }
    
    }