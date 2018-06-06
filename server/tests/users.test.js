const expect = require('expect');
const {Users} = require('../utils/users');

describe('Users class test', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Caspar',
        room: 'Room A'
      },
      {
        id: 2,
        name: 'Viki',
        room: 'Room A'
      },
      {
        id: 3,
        name: 'Caspar',
        room: 'Room B'
      }
    ]
  });

  it('should add new user', () => {
    let usr = new Users();
    let userInfo = {
      id: 123,
      name: 'Caspar',
      room: 'Room A',
      hehe: 'hehe'
    };
    usr.addUser(userInfo);

    expect(usr.users.length).toBe(1);
    expect(usr.users[0]).toMatchObject({
      id: 123,
      name: 'Caspar',
      room: 'Room A'
    });
  });

  it('should return names for Room A', () => {
    let userList = users.getUserList('Room A');
    expect({userList}).toMatchObject({userList:['Caspar', 'Viki']});
  });

  it('should return names for Room B', () => {
    let userList = users.getUserList('Room B');
    expect({userList}).toMatchObject({userList:['Caspar']});
  });

  it('should not remove a user if not found', () => {
    let removedUser = users.removeUser(5);
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it('should find a user by id', () => {
    let user = users.getUser(1);
    expect(user).toMatchObject({
      id: 1,
      name: 'Caspar',
      room: 'Room A'
    });
  });
  it('should not find a user if not found', () => {
    let user = users.getUser(5);
    expect(user).toBeFalsy();
  });
});
