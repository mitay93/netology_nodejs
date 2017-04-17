const http = require('http'),
  port = 3000,
  server = http.createServer();

function getHash(data) {
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'Firstname': data.firstname
    },
    hostname: 'netology.tomilomark.ru',
    method: 'POST',
    path: '/api/v1/hash'
  };
  return new Promise((resolve, reject) => {
    if (! data.firstname) reject("Firstname is undefined");
    if (! data.lastname) reject("Lastname is undefined");
    let request = http.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('error', (error) => {
        reject(`There is an error: ${error}`);
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      })
    });
    request.write(JSON.stringify({lastName: data.lastname}));
    request.end();
  });
}


function handler(req, res) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    data = JSON.parse(data);
    getHash(data).then((hash) => {
      data.hash = hash.hash;
      res.writeHead(200, {"Content-Type": "application/json"});
      console.log(data);
      res.end(JSON.stringify(data));
    }, (error) => {
      res.end(`There is an error: ${error}`);
    });
  })
}

server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
  console.log('Your server was started');
});

server.listen(port);