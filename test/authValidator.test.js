import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateRegister } from '../src/validators/authValidator.js';
import { AppError } from '../src/errors/AppError.js';

describe('validateRegister', () => {
  it('devuelve los datos limpios cuando el registro es valido', () => {
    const result = validateRegister({
      name: '  Ana Torres  ',
      email: '  ANA@Example.COM  ',
      password: 'una frase de acceso segura',
    });

    assert.equal(result.name, 'Ana Torres');
    assert.equal(result.email.toLowerCase(), 'ana@example.com');
    assert.equal(result.password, 'una frase de acceso segura');
  });

  it('lanza AppError 422 si los campos estan vacios', () => {
    assert.throws(
      () => validateRegister({ name: '   ', email: '', password: '' }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('name' in errorFields);
        assert.ok('email' in errorFields);
        assert.ok('password' in errorFields);
        return true;
      }
    );
  });

  it('lanza AppError 422 si el email tiene formato incorrecto o la contrasena es muy corta', () => {
    assert.throws(
      () =>
        validateRegister({
          name: 'a'.repeat(150),
          email: 'correo-invalido',
          password: '123',
        }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('name' in errorFields);
        assert.ok('email' in errorFields);
        assert.ok('password' in errorFields);
        return true;
      }
    );
  });
});