const API_URL = "http://localhost:3000"; // backend url

export async function get(path) {
  let res = await fetch(API_URL + path, { credentials: "include" });
  return res.json();
}

export async function post(path, body) {
  let res = await fetch(API_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function put(path, body) {
  let res = await fetch(API_URL + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function del(path) {
  let res = await fetch(API_URL + path, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}
