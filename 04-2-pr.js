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
  verifyUser: (username, password) =>
    new Promise((res, rej) => {
      const user = usersList.find(
        u => u.username === username && u.password === password
      );
      user
        ? res({ username })
        : rej(new AccessError('Wrong username or password'));
    }),

  // get roles array
  getRoles: userInfo =>
    new Promise((res, rej) => {
      const userRoles = rolesList
        .filter(u => u.username === userInfo.username)
        .map(u => u.role);
      userRoles.length
        ? res({ ...userInfo, userRoles })
        : rej(new AccessError('This user has no roles'));
    }),

  // access if admin
  logAccess: userInfo =>
    new Promise((res, rej) => {
      userInfo.userRoles.includes(roles.ADMIN)
        ? res({ ...userInfo, verified: true })
        : rej(new AccessError('This user is not admin. Access denied'));
    })
};

const greet = userInfo =>
  console.log(`
  LOGIN SUCCESSFUL
  Username: ${userInfo.username}
  Roles: ${userInfo.userRoles.join(', ')}
`);

const errorHandler = err => console.log(err.toString());

const verifyUserPromise = (username, password) =>
  dataBase
    .verifyUser(username, password)
    .then(dataBase.getRoles)
    .then(dataBase.logAccess);

verifyUserPromise('Bob', '222').then(greet, errorHandler); // AccessError: Wrong username or password
verifyUserPromise('Sarah', '222').then(greet, errorHandler); // AccessError: Wrong username or password
verifyUserPromise('Sam', '222').then(greet, errorHandler); // AccessError: This user is not admin. Access denied
verifyUserPromise('Bob', '111').then(greet, errorHandler); // LOGIN SUCCESS, User details
