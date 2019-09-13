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
  verifyUser: (username, password, callback) => {
    const user = usersList.find(u => u.username === username);
    let error = null;

    if (!user) error = Error("This user doesn't exist");
    else if (user.password !== password) error = Error('Wrong password');

    return callback(error, user);
  },
  // get roles array
  getRoles: (username, callback) => {
    const userRoles = rolesList.filter(u => u.username === username);
    let error = null;

    if (userRoles.length === 0) error = Error('This user has no roles');

    return callback(error, userRoles.map(u => u.role));
  },
  // access if admin
  logAccess: (username, callback) => {
    const userRoles = rolesList.filter(u => u.username === username);
    let error = null;

    if (userRoles.length === 0) error = Error('This user has no roles');
    if (!userRoles.map(u => u.role).includes(roles.ADMIN))
      error = Error('This user is not admin. Access denied');

    return callback(error);
  }
};

const verifyUser = function(username, password, callback) {
  dataBase.verifyUser(username, password, (error, userInfo) => {
    if (error) {
      callback(error);
    } else {
      dataBase.getRoles(username, (error, roles) => {
        if (error) {
          callback(error);
        } else {
          dataBase.logAccess(username, error => {
            if (error) {
              callback(error);
            } else {
              callback(null, userInfo, roles);
            }
          });
        }
      });
    }
  });
};

function greet(err, userInfo, roles) {
  if (err) console.log(err.toString());
  else
    console.log(`
    LOGIN SUCCESSFUL
    Username: ${userInfo.username}
    Roles: ${roles.join(', ')}
    `);
}

verifyUser('Bob', '222', greet); // Error: Wrong password
verifyUser('Sarah', '222', greet); // Error: This user doesn't exist
verifyUser('Sam', '222', greet); // Error: This user is not admin. Access denied
verifyUser('Bob', '111', greet); // LOGIN SUCCESS, User details
