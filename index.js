const express = require('express'); // loading express library
const cors = require('cors'); // cross origin request ..., Schutzmechanismus
const path =  require('path'); // path package node

const app = express(); //instanciate express app, Server starten
const port = 3000; // unsere app hört auf diesen port (Standart http-Port: 80, https: 443)

app.use(cors());

app.use(express.static("client"));

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});