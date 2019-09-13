const fetch = require('node-fetch');
const url = 'https://api.github.com/users';

// Utility fn to fetch repo counts
const fetchPublicReposCount = async username => {
  const response = await fetch(`${url}/${username}`);
  const json = await response.json();
  return json['public_repos'];
};

const users = ['ArfatSalman', 'octocat', 'norvig', 'AveCezar17'];

const counts = users.map(async username => {
  const count = await fetchPublicReposCount(username);
  return count;
});

// console.log(counts);

async function fetchCounts(users) {
  const counts = [];
  for (let i = 0; i < users.length; i++) {
    const username = users[i];
    const count = await fetchPublicReposCount(username);
    counts.push(count);
  }
  return counts;
}

// console.log(fetchCounts(users));

async function fetchAllCounts(users) {
  const promises = users.map(async username => {
    const count = await fetchPublicReposCount(username);
    return count;
  });
  return Promise.all(promises);
}

// console.log(fetchAllCounts(users));

// Т.к. fetchAllCounts возвращает промис, то вывод результатов возможен только после его выполнения
fetchAllCounts(users).then(res => console.log(res));
