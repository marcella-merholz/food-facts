const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserChallengeRepository {

    // challenge.html --------------------------------------------------------------------------- //
    async openDb() {
        return sqlite.open({
            filename: 'foodFacts.db',
            driver: sqlite3.Database
        })
    }

    async setUserChallenge(challengeId, duration, userId) {
        const db = await this.openDb();
        await db.exec('CREATE TABLE IF NOT EXISTS userChallenges (ID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, ChallengeID INTEGER NOT NULL, Duration TEXT NOT NULL, Status INTEGER NOT NULL);');
        await db.run('INSERT INTO userChallenges(UserID, ChallengeID, Duration, Status) VALUES (?,?,?,?)', [userId, challengeId, duration, 0]);
    }

    // userSettings.html ---------------------------------------------------- //
    async getUserChallenges(userId) {
        const db = await this.openDb();
        const userChallenges = await db.all(`select * from challenges left join userChallenges on challenges.ID = userChallenges.ChallengeID where UserID = ?`, [userId]);
        db.close()
        console.log(userChallenges);
        return userChallenges;
    }

    async updateSelected(id, status) {
        console.log(typeof id, id, typeof status, status);
        const db = await this.openDb();
        await db.run('UPDATE userChallenges SET Status = ? WHERE ID = ?', [status, id]);
        db.close()
    }

    async getUserPoints() {
        const db = await this.openDb();
        const userPoints = await db.all(`SELECT ifnull(SUM(points), 0) Points FROM challenges join userChallenges on challenges.ID = userChallenges.ChallengeID where Status = 1 and UserID = ?`, [1]);
        db.close()
        console.log(userPoints);
        return userPoints[0];
    }

    async cancelChallenge(userId, status) {
        console.log(typeof userId, userId, typeof status, status);
        const db = await this.openDb();
        await db.run('UPDATE userChallenges SET Status = ? WHERE UserID = ?', [status, userId]);
        db.close()
    }

}