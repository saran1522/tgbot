async function getUsers() {
  const response = await fetch("http://localhost:9000/users");
  const users = await response.json();
  return users;
}

async function getBlockedUsers() {
  const response = await fetch("http://localhost:9000/blocked");
  const users = await response.json();
  return users;
}

async function addUser(user) {
  const response = await fetch("http://localhost:9000/users", {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify(user),
  });
  const users = await response.json();
  return users;
}

module.exports = {
  getUsers,
  getBlockedUsers,
  addUser,
};
