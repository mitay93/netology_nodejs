const User = require('./user.js');

class Users {
  constructor() {
    this.lastId = 1;
    this.users = []
  }
  
  getUser(id) {
    return new Promise((resolve, reject) => {
      if (id) {
        let user = this.users.find((user) => user.id == id);
        if (user) {
          resolve(user);
        } else {
          reject({'Error': 'User was not found'});
        }
      } else {
        reject({'Error': '"id" field is required'});
      }
    });
  }
  
  getAll(offset, limit, fields) {
    return new Promise((resolve, reject) => {
      if (this.users.length > 0) {
        let filtered = this.users.slice(offset ? offset : 0, limit ? offset + limit : this.users.length);
        if (fields) {
          let result = [];
          filtered.forEach((user) => {
            let userCopy = Object.assign({}, user);
            Object.keys(userCopy).forEach((i) => {
              if (! fields.includes(i)) delete userCopy[i];
            });
            result.push(userCopy);
          });
          resolve(result);
        }
        else {
          resolve(filtered)
        }
      } else {
        reject({'Error': 'Users list is empty'});
      }
    });
  }
  
  addUser(user) {
    return new Promise((resolve, reject) => {
      if (user && user.name && user.score) {
        user.id = this.lastId ++;
        this.users.push(user);
        resolve(user);
      } else {
        if (! user.name) {
          reject({'Error': '"name" field is required'});
        } else if (! user.score) {
          reject({'Error': '"score" field is required'});
        }
      }
    });
  }
  
  updateUser(id, user) {
    return new Promise((resolve, reject) => {
      if (id) {
        let foundUser = this.users.find((user) => user.id == id);
        if (foundUser) {
          if (! user.name) {
            reject({'Error': '"name" field is required'});
          } else if (! user.score) {
            reject({'Error': '"score" field is required'});
          } else {
            this.users[this.users.indexOf(foundUser)].name = user.name;
            this.users[this.users.indexOf(foundUser)].score = user.score;
            resolve(this.users[this.users.indexOf(foundUser)]);
          }
        } else {
          reject({'Error': 'User was not found'});
        }
      } else {
        reject({'Error': '"id" field is required'});
      }
    });
  }
  
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      if (id) {
        let deletedUser = this.users.find((user) => user.id == id);
        console.log(deletedUser);
        if (deletedUser) {
          this.users.splice(this.users.indexOf(deletedUser), 1);
          resolve(deletedUser);
        } else {
          reject({'Error': 'User was not found'});
        }
      } else {
        reject({'Error': '"id" field is required'});
      }
    });
  }
  
  deleteAll() {
    return new Promise((resolve, reject) => {
      if (this.users.length > 0) {
        this.users = [];
        this.lastId = 1;
        resolve({"Status": "All users are deleted"})
      }
      else {
        reject({'Error': 'Users list is empty'});
      }
    })
  }
}

module.exports = Users;
