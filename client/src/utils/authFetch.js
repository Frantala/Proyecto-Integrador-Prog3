export async function authFetch(url, options = {}, logout, navigate) {
  const response = await fetch(url, options);

  if (response.status === 401 || response.status === 403) {
    if (logout) logout();
    if (navigate) navigate('/login', { replace: true });

    const defaultMessage = response.status === 401
      ? 'Sesión expirada. Por favor inicia sesión de nuevo.'
      : 'No autorizado. Por favor inicia sesión.';

    let errorMessage = defaultMessage;
    try {
      const data = await response.json();
      if (data?.message) {
        errorMessage = data.message;
      }
    } catch {
      // Ignorar si la respuesta no es JSON
    }

    throw new Error(errorMessage);
  }

  return response;
}
