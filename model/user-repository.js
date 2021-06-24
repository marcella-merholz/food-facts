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

  async getUsers() {
    // data storage interaction here (f.e. DB access)
    const db = await this.openDb();
    const users = await db.all('SELECT * FROM users;');
    console.log(users);
    return users;
  }

}