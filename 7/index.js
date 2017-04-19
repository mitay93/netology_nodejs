const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  middlewareHeaderCheck = (req, res, next) => {
    req.body.coolHeader === undefined ?  res.status(401).end('Error 401') : next();
  };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) =>{
  res.status(200).end('Hello, Express.js');
});

app.get('/hello', (req, res) => {
  res.status(200).end('Hello stranger!');
});

app.get('/hello/:name', (req, res) => {
  res.status(200).end(`Hello, ${req.params.name}`);
});

app.all('/sub/*', (req, res) => {
  res.status(200).end(`You requested URI: ${req.protocol}://${req.hostname}:${req.port}${req.path}`);
});

app.post('/post', middlewareHeaderCheck, (req, res) => {
  Object.keys(req.body).length ? res.json(req.body) : res.status(404).end('Not Found');
});

app.listen(3000);

console.log("Server is up on 3000 port");