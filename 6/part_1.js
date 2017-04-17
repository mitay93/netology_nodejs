const app = require('express')(),
  bodyParser = require('body-parser'),
  User = require('./modules/user.js'),
  Users = require('./modules/users.js');

const response = (res, data) => {
  res.json(data);
};

const error = (res, err) => {
  res.status(400).json(err);
};

let users = new Users();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  let offset = req.query.offset,
    limit = req.query.limit,
    fields = JSON.parse(req.query.fields);
  users.getAll(offset ? Number(offset) : false, limit ? Number(limit) : false, fields ? fields : false).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});

app.get('/users/:id', (req, res) => {
  users.getUser(req.params.id).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});

app.post('/users', (req, res) => {
  users.addUser(new User(req.body.name, req.body.score)).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});

app.put('/users/:id', (req, res) => {
  users.updateUser(req.params.id, new User(req.body.name, req.body.score)).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});

app.delete('/users/:id', (req, res) => {
  users.deleteUser(req.params.id).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});
app.delete('/users', (req, res) => {
  users.deleteAll(req.params.id).then(
    (data) => response(res, data),
    (err) => error(res, err)
  );
});

app.listen(3000, () => {
  console.log('Server was started');
});
