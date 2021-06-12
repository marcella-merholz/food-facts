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
    // await db.exec('DROP TABLE IF EXISTS users');
    await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username Text NOT NULL, email Text NOT NULL, password Text NOT NULL);');
    // await db.exec('INSERT INTO users (username, email, password) VALUES ("Sabrina", "vonsab@gmx.at", "geheim47"),("Marcella", "marcella_merholz@web.de", "password7");');
  }

  async addUser(userData) {
    try {
      const db = await this.openDb();
      // const { username, email, password } = userData;
      // const response = await db.exec(`INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${password}");`);
      // console.log(username, email, password)
      await db.run('INSERT INTO users (username, email, password) VALUES (?,?,?)', [userData.username, userData.email, userData.password,]);

      const users = await db.all('SELECT * FROM users;');
      console.log(users);
    } catch (err) {
      console.log('adduser error', err)
    }
  }

  async getUserByEmail(newEmail) {
    const db = await this.openDb();
    const user = await db.all('SELECT * FROM users WHERE email = ?', [newEmail]);
    return user;
  }

  async getUsers() {
    // data storage interaction here (f.e. DB access)
    const db = await this.openDb();
    const users = await db.all('SELECT * FROM users;');
    return users;
  }

}