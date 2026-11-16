import * as userRepo from '../repositories/userRepository.js';

export async function list(req, res) {
  res.json(await userRepo.findAll());
}