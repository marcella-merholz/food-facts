const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserRepository {

  async getUsers() {
    // data storage interaction here (f.e. DB access)
    const db = await this.openDb();
    const users = await db.all('SELECT * FROM users;');
    return users;
  }

  async getUserByEmail(newEmail) {
    const db = await this.openDb();
    const user = await db.all('SELECT * FROM users WHERE email = ?', [newEmail]);
    return user;
  }

  async init() {
    const db = await this.openDb();
    await db.exec('DROP TABLE IF EXISTS users');
    await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, email  TEXT NOT NULL);');
    await db.exec('INSERT INTO users (username, password, email) VALUES ("Sabrina", "geheim47", "vonsab@gmx.at"),("Marcella", "password7", "marcella_merholz@web.de");');
  }

  async openDb() {
    return sqlite.open({
      filename: 'users.db',
      driver: sqlite3.Database
    })
  }

}