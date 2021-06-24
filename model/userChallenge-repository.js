const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserChallengeRepository {

    async openDb() {
        return sqlite.open({
            filename: 'foodFacts.db',
            driver: sqlite3.Database
        })
    }

    async setUserChallenge(challengeId, duration) {
        const db = await this.openDb();
        await db.exec('CREATE TABLE IF NOT EXISTS userChallenges (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, ChallengeID INTEGER NOT NULL, Duration TEXT NOT NULL, Status INTEGER NOT NULL);');
        await db.run('INSERT INTO userChallenges(UserID, ChallengeID, Duration, Status) VALUES (?,?,?,?)', ["1", challengeId, duration, 0]);
    }

    async getUserChallenges() {
        const db = await this.openDb();
        const userChallenges = await db.all('SELECT * FROM userChallenges;');
        console.log(userChallenges);
        return userChallenges;
      }
    
    }