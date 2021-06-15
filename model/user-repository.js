const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class UserRepository {

  async openDb() {
    return sqlite.open({
      filename: 'users.db',
      driver: sqlite3.Database
    })
  }

  async init() {
    const db = await this.openDb();
    await db.exec('DROP TABLE IF EXISTS users');
    await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username Text NOT NULL, email Text NOT NULL, password Text NOT NULL);');
    await db.exec('INSERT INTO users (username, email, password) VALUES ("Sabrina", "vonsab@gmx.at", "geheim47"),("Marcella", "marcella_merholz@web.de", "password7");');
  }

  async addUser(username, email, hashedPassword) {
    const db = await this.openDb();
    await db.run('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, hashedPassword,]);
  }

  async getUserByEmail(email) {
    const db = await this.openDb();
    const user = await db.all('SELECT * FROM users WHERE email = ?', [email]);
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