import * as userRepo from '../repositories/userRepository.js';
import { AppError } from '../errors/AppError.js';
import { parseId } from '../validators/commonValidator.js';
import { validateRole } from '../validators/userValidator.js';

export async function list(req, res) {
  res.json(await userRepo.findAll());
}

export async function updateRole(req, res) {
  const id = parseId(req.params.id);
  const user = await userRepo.findById(id);
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'El usuario no existe.');

  const { role } = validateRole(req.body);

  if (id === req.user.id && role !== 'admin')
    throw new AppError(
      409,
      'CANNOT_CHANGE_OWN_ROLE',
      'No puedes quitarte a ti mismo el rol de administrador.'
    );

  res.json(await userRepo.updateRole(id, role));
}