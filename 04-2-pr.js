const roles = {
  ADMIN: 'admin',
  USER: 'user'
};

const usersList = [
  { username: 'Bob', password: '111' },
  { username: 'Sam', password: '222' },
  { username: 'Matt', password: '333' }
];

const rolesList = [
  { username: 'Bob', role: roles.ADMIN },
  { username: 'Bob', role: roles.USER },
  { username: 'Sam', role: roles.USER },
  { username: 'Matt', role: roles.USER }
];

const dataBase = {
  // check username and password
  verifyUser: (username, password) => {
    return new Promise((res, rej) => {
      const user = usersList.find(u => u.username === username);
      if (!user) rej(Error("This user doesn't exist"));
      if (user.password !== password) rej(Error('Wrong password'));
      res(user);
    });
  },

  // get roles array
  getRoles: username => {
    return new Promise((res, rej) => {
      const userRoles = rolesList.filter(u => u.username === username);
      if (userRoles.length === 0) rej(Error('This user has no roles'));
      res(userRoles.map(u => u.role));
    });
  },

  // access if admin
  logAccess: username => {
    return new Promise((res, rej) => {
      const userRoles = rolesList.filter(u => u.username === username);
      if (userRoles.length === 0) rej(Error('This user has no roles'));
      if (!userRoles.map(u => u.role).includes(roles.ADMIN))
        rej(Error('This user is not admin. Access denied'));
      res();
    });
  }
};

const verifyUser = function(username, password) {
  let user = null;
  let roles = [];

  dataBase
    .verifyUser(username, password)
    .then(userData => {
      user = userData;
      return dataBase.getRoles(userData.username);
    })
    .then(rolesArray => {
      roles = rolesArray;
      return dataBase.logAccess(username);
    })
    .then(() => {
      console.log(`
    LOGIN SUCCESSFUL
    Username: ${user.username}
    Roles: ${roles.join(', ')}
    `);
    })
    .catch(err => console.log(err.toString()));
};

verifyUser('Bob', '222'); // Error: Wrong password
verifyUser('Sarah', '222'); // Error: This user doesn't exist
verifyUser('Sam', '222'); // Error: This user is not admin. Access denied!
verifyUser('Bob', '111'); // LOGIN SUCCESS, User details
