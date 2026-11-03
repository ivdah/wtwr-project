import handleServerResponse from "./handleServerResponse";

const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers })
    .then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);

export const removeItem = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then(handleServerResponse);

export const addCardLike = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then(handleServerResponse);

export const removeCardLike = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then(handleServerResponse);
