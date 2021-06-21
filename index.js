const express = require('express'); // loading express library
const cors = require('cors'); // cross origin request ..., Schutzmechanismus
const path = require('path'); // path package node
const fs = require('fs');
const UserController = require("./api/user-controller");
const UserRepository = require("./model/user-repository");
const UserChallengeController = require("./api/userChallenge-controller");
const UserChallengeRepository = require("./model/userChallenge-repository");
const { text } = require('express');

const app = express(); //instanciate express app, Server starten
const userController = new UserController();
const userChallengeController = new UserChallengeController();

const port = 3000; // unsere app hört auf diesen port (Standart http-Port: 80, https: 443)

app.use(cors());
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// User ------------------------------------------------------------------------
app.post('/user/register', async function (req, res, next) {
  try {
    await userController.register(req.body);
    res.status(200).json({ message: 'Sie haben sich erfolgreich registriert.' });
  } catch (err) {
    next(err);
  }
});

app.post('/user/login', async function (req, res, next) {
  try {
    await userController.login(req.body);
    res.status(200).json({ message: 'Sie haben sich erfolgreich eingeloggt.' });
  } catch (err) {
    next(err);
  }
});

app.get("/users", async function (req, res, next) {
  const users = await userController.getUsers();
  res.json(users);
});


// UserChallenge ------------------------------------------------------------------------
app.post('/challenge/select', async function (req, res, next) {
  try {
    await userChallengeController.getSelected(req.body);
    res.status(200).json({ message: 'YEAH! Sie haben Ihre persönliche Challenge erstellt. Den aktuellen Status können Sie sich jederzeit in Ihren Benutzereinstellungen anzeigen lassen und verändern.' });
  } catch (err) {
    next(err);
  }
});

app.get("/userChallenges", async function (req, res, next) {
  const userChallenges = await userChallengeController.getUserChallenges();
  res.json(userChallenges);
});


/* Excercise -----------------------------------------------------------

let content = {
  counter: 0,
  person: [{ name: 'Paula', age: 33, gender: 'female' }, { name: 'Laura', age: 8, gender: 'female' }]
}

app.get('/api/sayHello', function (req, res) {
  ++content.counter

  fs.readFile('./server/server.txt', 'utf8', function (err, data) {
    if (err) {
      console.error(err)
      return res.send(401, 'Keine Berechtigung');
    }
    content.data = data
  })

  res.json(content)

});

app.post('/api/sayHello', function (req, res) {
  console.log(req.body)
  content.hello = req.body.myName;
  res.sendStatus(200);
});

Excercise end -----------------------------------------------------------*/

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});

// create db an fill with data
const userRepository = new UserRepository();
userRepository.init().catch(error => console.error(error));

app.use(function (err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

const userChallengeRepository = new UserChallengeRepository();
userChallengeRepository.init().catch(error => console.error(error));

app.use(function (err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});
