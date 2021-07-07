const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserRepository {

  async openDb() {
    return sqlite.open({
      filename: 'foodFacts.db',
      driver: sqlite3.Database
    })
  }

  async addUser(username, email, hashedPassword) {
    const db = await this.openDb();
    await db.run('INSERT INTO users (Username, Email, Password) VALUES (?,?,?)', [username, email, hashedPassword,]);
  }

  async getUserByEmail(email) {
    const db = await this.openDb();
    const user = await db.all('SELECT * FROM users WHERE Email = ?', [email]);
    if (user.length === 0) {
      return null;
    } else {
      return user[0];
    }
  }

  async startSession(sessionID, userID) {
    const db = await this.openDb();
    await db.run('INSERT INTO sessions (UserID, SessionID) VALUES (?,?)', [userID, sessionID]);
  }

  async getUserIdBySessionId(sessionId) {
    const db = await this.openDb();
    const userSession = await db.all('SELECT * FROM sessions WHERE SessionID = ?', [sessionId]);
    if (userSession.length === 0) {
      return null;
    } else {
      return userSession[0].userID;
    }
  }

  async getUsers() {
    const db = await this.openDb();
    const users = await db.all('SELECT * FROM users;');
    console.log(users);
    return users;
  }

}