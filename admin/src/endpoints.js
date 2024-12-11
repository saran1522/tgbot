export async function getUsers() {
  const response = await fetch("http://localhost:9000/users");
  const users = await response.json();
  return users;
}

export async function getBlockedUsers() {
  const response = await fetch("http://localhost:9000/blocked");
  const users = await response.json();
  return users;
}

export async function addUser(user) {
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

export async function blockUser(user) {
  const response = await fetch("http://localhost:9000/blocked", {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify(user),
  });
  const users = await response.json();
  return users;
}

export async function unblockUser(id) {
  const response = await fetch(`http://localhost:9000/blocked/${id}`, {
    method: "DELETE",
    headers: {
      contentType: "application/json",
    },
  });
  const users = await response.json();
  return users;
}

export async function deleteUser(id) {
  const response = await fetch(`http://localhost:9000/users/${id}`, {
    method: "DELETE",
    headers: {
      contentType: "application/json",
    },
  });
  const users = await response.json();
  return users;
}
