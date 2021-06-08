const express = require('express'); // loading express library
const cors = require('cors'); // cross origin request ..., Schutzmechanismus
const path = require('path'); // path package node
const fs = require('fs');

const app = express(); //instanciate express app, Server starten
const port = 3000; // unsere app hört auf diesen port (Standart http-Port: 80, https: 443)

app.use(cors());
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/user/register', async function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let userName = req.body.userName;
  let userData = { name: name, email: email, userName: userName };
  res.send(userData);
  console.log(req.body.name);
});

/* Excercise -----------------------------------------------------------*/

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

/* Excercise end -----------------------------------------------------------*/

app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});

