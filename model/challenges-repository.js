const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

module.exports = class challengesRepository {

  async openDb() {
    return sqlite.open({
      filename: 'food-facts.db',
      driver: sqlite3.Database
    })
  }

  async init() {
    const db = await this.openDb();
    await db.exec('DROP TABLE IF EXISTS challenges');
    await db.exec('CREATE TABLE IF NOT EXISTS challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, points VARCHAR(3) NOT NULL);');
    await db.exec(`INSERT INTO challenges (description, points) VALUES ("Ich verzichte auf Fleischprodukte.", "10"),("Ich achte auf Bio-Qualität.", "3"),
    ("Ich wähle saissonale Angebote.", 5),("Ich kaufe unverpackte Produkte.", 7),("Ich verzichte auf Plastikflaschen.", 5),("Ich verwerte statt wegzuschmeißen.", 5),
    ("Ich bereite mein Essen frisch zu.", 7),("Ich achte auf faire Produktion.", 5),("Ich kaufe keine Produkte aus Massentierhaltung.", 10);`);
  }

  async getChallenges() {
    const db = await this.openDb();
    const challenges = await db.all('SELECT * FROM challenges;');
    return challenges;
  }

}