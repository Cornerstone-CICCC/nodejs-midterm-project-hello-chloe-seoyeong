export function fetchGetUser() {
  return fetch(`http://localhost:3500/user/profile`, {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json());
}
