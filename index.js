const express = require('express'); // loading express library
const cors = require('cors'); // cross origin request ..., Schutzmechanismus
const path =  require('path'); // path package node
const fs = require('fs');

const app = express(); //instanciate express app, Server starten
const port = 3000; // unsere app hört auf diesen port (Standart http-Port: 80, https: 443)

app.use(cors());

app.use(express.static("client"));
app.use(express.json());

/*
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
*/

let content = {
  counter: 0,
  person: [
    {
      name: 'Paula',
      age: 33,
      gender: 'female'
    },
    {
      name: 'Laura',
      age: 8,
      gender: 'female'
    },
  ]
}

app.get('/api/sayHello', function (req, res){
  ++content.counter

  fs.readFile('./server/server.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return res.send(401, 'Keine Berechtigung');
    }
    content.data = data
  })

  res.json( content )
  
});


app.post('/api/sayHello', function (req, res){
 
  console.log(req.body)
  content.hello = req.body.myName;
  res.sendStatus(200);
  
});


app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});