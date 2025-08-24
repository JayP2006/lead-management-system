const API_URL = "https://lead-backend-3ij1.onrender.com";

function getHeaders() {
  let token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

export async function get(path) {
  let res = await fetch(API_URL + path, {
    headers: getHeaders(),
    credentials: "include",
  });
  return res.json();
}

export async function post(path, body) {
  let res = await fetch(API_URL + path, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function put(path, body) {
  let res = await fetch(API_URL + path, {
    method: "PUT",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function del(path) {
  let res = await fetch(API_URL + path, {
    method: "DELETE",
    headers: getHeaders(),
    credentials: "include",
  });
  return res.json();
}
