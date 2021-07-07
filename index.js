const express = require('express'); // loading express library
const cors = require('cors'); // cross origin request ..., Schutzmechanismus
const path = require('path'); // path package node
const fs = require('fs');

const UserController = require("./api/user-controller");
const UserRepository = require("./model/user-repository");
const ChallengesController = require("./api/challenges-controller");
const ChallengesRepository = require("./model/challenges-repository");
const UserChallengeController = require("./api/userChallenge-controller");
const UserChallengeRepository = require("./model/userChallenge-repository");
const { text } = require('express');

const app = express(); //instanciate express app, Server starten
const userController = new UserController();
const challengesController = new ChallengesController();
const userChallengeController = new UserChallengeController();

const port = 3000; // unsere app hört auf diesen port (Standart http-Port: 80, https: 443)

app.use(cors());
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// user.html ------------------------------------------------------------------------------ //
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
    const sessionId = await userController.login(req.body);
    res.status(200).json({sessionId, message: 'Sie haben sich erfolgreich eingeloggt.'});
  } catch (err) {
    next(err);
  }
});

// challenge.html ------------------------------------------------------------------------ //
app.get("/challenges", async function (req, res, next) {
  const challenges = await challengesController.getChallenges();
  res.json(challenges);
});

app.get("/sessionUser/:sessionId", async function (req, res, next) {
  const {sessionId} = req.params;
  const userId = await userController.getSessionUser(sessionId);
  res.json(userId);
});

app.post('/challengeSelect', async function (req, res, next) {
  try {
    await userChallengeController.checkSelected(req.body);
    res.status(200).json({ message: 'YEAH! Sie haben Ihre persönliche Challenge erstellt. Den aktuellen Status können Sie sich jederzeit in Ihren Benutzereinstellungen anzeigen lassen und verändern.' });
  } catch (err) {
    next(err);
  }
});

// userSettings.html ------------------------------------------------------------------------ /
// Endpunkt userChallenges mit Parameter sessionId
app.get("/userChallenge/:sessionId", async function (req, res, next) {
  const {sessionId} = req.params;
  const userChallenges = await userChallengeController.getUserChallenges(sessionId);
  res.json(userChallenges);
});

app.patch('/userChallenge/toggle', async function (req, res, next) {
  try {
    console.log('Patch')
    await userChallengeController.updateSelected(req.body);
    res.status(200).json({ message: 'challenges wurden upgedatet'});
  } catch (err) {
    console.log("err: ", err)
    next(err);
  }
});

app.get ("/userChallengePoints", async function (req, res, next) {
  const userPoints = await userChallengeController.getUserPoints();
  res.json(userPoints); 
});

app.patch('/userChallenge/cancel', async function (req, res, next) {
  try {
    await userChallengeController.cancelChallenge(req.body);
    res.status(200).json({ message: 'YEAH!' });
  } catch (err) {
    next(err);
  }
});

// Allgemein --------------------------------------------------------------------------- //
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});


// create db an fill with data / error handling ----------------------------------------- //
const userRepository = new UserRepository();

app.use(function (err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

const challengesRepository = new ChallengesRepository();

app.use(function (err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

const userChallengeRepository = new UserChallengeRepository();

app.use(function (err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});