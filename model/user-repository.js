const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserRepository {

  async getUsers() {
    // data storage interaction here (f.e. DB access)
    const db = await this.openDb();
    const users = await db.all('SELECT * FROM users;');
    return users;
  }

  async init() {
    const db = await this.openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, email  TEXT NOT NULL);');
    await db.exec('INSERT INTO users VALUES (1,"Sabrina", "geheim47", "vonsab@gmx.at"),(2,"Marcella", "password7", "marcella_merholz@web.de");');
  }

  async openDb() {
    return sqlite.open({
      filename: 'users.db',
      driver: sqlite3.Database
    })
  }

}