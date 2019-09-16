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

// added custom error class
class AccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccessError';
  }
}

const dataBase = {
  // check username and password
  verifyUser: (username, password, callback) => {
    const user = usersList.find(u => u.username === username);
    return user && user.password === password
      ? callback(null, { username })
      : callback(new AccessError('Wrong username or password'));
  },

  // get roles array
  getRoles: (userInfo, callback) => {
    const userRoles = rolesList
      .filter(u => userInfo.username === u.username)
      .map(u => u.role);
    return userRoles.length
      ? callback(null, { ...userInfo, userRoles })
      : callback(new AccessError('This user has no roles'));
  },

  // access if admin
  logAccess: (userInfo, callback) =>
    userInfo.userRoles.includes(roles.ADMIN)
      ? callback(null, { ...userInfo, verified: true })
      : callback(new AccessError('This user is not admin. Access denied'))
};

const verifyUser = function(username, password, callback) {
  dataBase.verifyUser(username, password, (error, userInfo) => {
    if (error) {
      callback(error);
    } else {
      dataBase.getRoles(userInfo, (error, userInfo) => {
        if (error) {
          callback(error);
        } else {
          dataBase.logAccess(userInfo, (error, userInfo) => {
            if (error) {
              callback(error);
            } else {
              callback(null, userInfo);
            }
          });
        }
      });
    }
  });
};

function greet(err, userInfo) {
  // left toString() here for shorter output
  if (err) console.error(err.toString());
  else
    console.log(`
    LOGIN SUCCESSFUL
    Username: ${userInfo.username}
    Roles: ${userInfo.userRoles.join(', ')}
    `);
}

verifyUser('Bob', '222', greet); // AccessError: Wrong username or password
verifyUser('Sarah', '222', greet); // AccessError: Wrong username or password
verifyUser('Sam', '222', greet); // AccessError: This user is not admin. Access denied
verifyUser('Bob', '111', greet); // LOGIN SUCCESS, User details

// Question: how can I assert console.log output?
