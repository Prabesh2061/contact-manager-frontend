const userLogin = async (email, password) => {
  const response = await fetch('http://localhost:4004/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

const createUser = async (username, email, password) => {
  const response = await fetch('http://localhost:4004/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
}

export default { userLogin, createUser };