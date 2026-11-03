const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export default handleServerResponse;
