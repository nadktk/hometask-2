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

  verifyUser: async (username, password) => {
    const user = usersList.find(
      u => u.username === username && u.password === password
    );
    if (!user) throw new AccessError('Wrong username and password');
    return { username };
  },

  // get roles array
  getRoles: async userInfo => {
    const userRoles = rolesList
      .filter(u => u.username === userInfo.username)
      .map(u => u.role);
    if (!userRoles.length) throw new AccessError('This user has no roles');
    return { ...userInfo, userRoles };
  },

  // access if admin
  logAccess: async userInfo => {
    if (!userInfo.userRoles.includes(roles.ADMIN))
      throw new AccessError('This user is not admin. Access denied');
    return { ...userInfo, verified: true };
  }
};

const greet = userInfo =>
  console.log(`
  LOGIN SUCCESSFUL
  Username: ${userInfo.username}
  Roles: ${userInfo.userRoles.join(', ')}
`);

const verifyUserAsync = async function(username, password) {
  try {
    let userInfo = await dataBase.verifyUser(username, password);
    const userInfoWithRoles = await dataBase.getRoles(userInfo);
    greet(await dataBase.logAccess(userInfoWithRoles));
  } catch (err) {
    console.log(err.toString());
  }
};

verifyUserAsync('Bob', '222'); // AccessError: Wrong username and password
verifyUserAsync('Sarah', '222'); // AccessError: Wrong username and password
verifyUserAsync('Sam', '222'); // AccessError: This user is not admin. Access denied
verifyUserAsync('Bob', '111'); // LOGIN SUCCESS, User details
