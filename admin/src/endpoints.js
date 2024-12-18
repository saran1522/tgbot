export async function getUsers() {
  const response = await fetch(
    "https://saran1522.github.io/tgbot/admin/src/data.json"
  );
  const users = await response.json();
  return users;
}

export async function userOperations(users) {
  await fetch("https://saran1522.github.io/tgbot/admin/src/data.json", {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify(users),
  });
}
