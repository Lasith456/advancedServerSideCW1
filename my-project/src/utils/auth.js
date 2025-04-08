import Cookies from 'js-cookie';

export function getToken() {
  return Cookies.get('refreshToken');
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 1 ? 'admin' : 'user';
  } catch (err) {
    return null;
  }
}
