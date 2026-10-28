import * as authService from '../services/authService.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';

export async function register(req, res) {
  const data = validateRegister(req.body);
  const user = await authService.register(data);
  res.status(201).json(user);
}

export async function login(req, res) {
  const data = validateLogin(req.body);
  const result = await authService.login(data);
  res.status(200).json(result);
}

export function me(req, res) {
  res.json(req.user);
}