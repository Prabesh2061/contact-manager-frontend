const apiUrl = import.meta.env.VITE_API_BASE_URL

const userLogin = async (email, password) => {
  const response = await fetch(`${apiUrl}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

const createUser = async (username, email, password) => {
  const response = await fetch(`${apiUrl}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
}

export default { userLogin, createUser };