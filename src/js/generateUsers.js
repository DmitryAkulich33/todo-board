function getUsersFromApi() {
  return fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json()
  );
}

export default getUsersFromApi;
