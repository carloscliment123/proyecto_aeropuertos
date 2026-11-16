import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateCity } from '../src/validators/cityValidator.js';
import { AppError } from '../src/errors/AppError.js';

describe('validateCity', () => {
  it('devuelve los datos limpios cuando la ciudad es valida', () => {
    const result = validateCity({
      name: '  Madrid  ',
      country: '  Espana  ',
    });

    assert.deepEqual(result, {
      name: 'Madrid',
      country: 'Espana',
    });
  });

  it('lanza AppError 422 si name o country estan vacios', () => {
    assert.throws(
      () => validateCity({ name: '   ', country: '' }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('name' in errorFields);
        assert.ok('country' in errorFields);
        return true;
      }
    );
  });

  it('lanza AppError 422 si name o country son demasiado largos', () => {
    const textoLargo = 'a'.repeat(150);

    assert.throws(
      () => validateCity({ name: textoLargo, country: textoLargo }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('name' in errorFields);
        assert.ok('country' in errorFields);
        return true;
      }
    );
  });
});