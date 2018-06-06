const _ = require('lodash');

class Users {
  constructor(){
    this.users = [];
  }

  addUser(params){
    let userParams = _.pick(params, ['id','name','room']);
    this.users.push(userParams);
    return userParams;
  }

  removeUser(id) {
    let match = _.findIndex(this.users, {id});
    if (match === -1) {
      return false;
    }
    return this.users.splice(match,1)[0];
  }

  getUser(id){
    let match = _.findIndex(this.users, {id});
    if (match === -1) {
      return false;
    }
    return this.users[match];
  }

  getUserList(room){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {
  Users
};
