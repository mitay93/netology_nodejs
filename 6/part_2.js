const app = require('express')(),
  bodyParser = require('body-parser'),
  User = require('./modules/user.js'),
  Users = require('./modules/users.js');

let users = new Users();

class RPC {
  
  getAll(params, callback) {
    users.getAll().then(
      (result) => callback(null, result),
      (err) => callback(err, null)
    );
  }
  
  getUser(params, callback) {
    users.getUser(params.id).then(
      (result) => callback(null, result),
      (err) => callback(err, null)
    );
  }
  
  addUser(params, callback) {
    users.addUser(new User(params.name, params.score)).then(
      (result) => callback(null, result),
      (err) => callback(err, null)
    );
  }
  
  update(params, callback) {
    users.updateUser(params.id, new User(params.name, params.score)).then(
      (result) => callback(null, result),
      (err) => callback(err, null)
    );
  }
  
  delete(params, callback) {
    users.deleteUser(params.id).then(
      (result) => callback(null, result),
      (err) => callback(err, null)
    );
  }
}

const rpcVersion = '2.0';
const rpc = new RPC();

const error = (res, id, err, code) => {
  res.status(400).json({
    jsonrpc: rpcVersion,
    error: {
      code: code,
      message: err
    },
    id: id
  });
};

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  let rpcMethod = rpc[req.body.method];
  
  if (! rpcMethod) {
    return error(res, req.body.id, 'Method not found', 404);
  }
  
  rpcMethod(req.body.params, (err, result) => {
    if (err) {
      return error(res, req.body.id, err, 32099);
    }
    
    res.json({
      jsonrpc: rpcVersion,
      result: result,
      id: req.body.id
    });
  });
});

app.listen(3000, () => {
  console.log('Server was started');
});
