import { AppError } from '../errors/AppError.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(details) {
  throw new AppError(
    422,
    'VALIDATION_ERROR',
    'Los datos enviados no son válidos.',
    details
  );
}

export function validateRegister(body = {}) {
  const details = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 2 || name.length > 100)
    details.name = 'El nombre debe tener entre 2 y 100 caracteres.';
  if (!EMAIL_RE.test(email) || email.length > 254)
    details.email = 'El correo no tiene un formato válido.';
  if (password.length < 8 || password.length > 72)
    details.password = 'La contraseña debe tener entre 8 y 72 caracteres.';

  if (Object.keys(details).length > 0) fail(details);
  return { name, email, password }; // el role del body ni se lee
}

export function validateLogin(body = {}) {
  const details = {};
  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email) details.email = 'El correo es obligatorio.';
  if (!password) details.password = 'La contraseña es obligatoria.';

  if (Object.keys(details).length > 0) fail(details);
  return { email, password };
}