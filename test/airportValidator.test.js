import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateAirport } from '../src/validators/airportValidator.js';
import { AppError } from '../src/errors/AppError.js';

describe('validateAirport', () => {
  it('devuelve los datos limpios con el codigo IATA en mayusculas', () => {
    const result = validateAirport({
      iataCode: '  mad  ',
      name: '  Adolfo Suarez Madrid-Barajas  ',
      cityId: 1,
    });

    assert.deepEqual(result, {
      iataCode: 'MAD',
      name: 'Adolfo Suarez Madrid-Barajas',
      cityId: 1,
    });
  });

  it('lanza AppError 422 si faltan campos obligatorios o estan vacios', () => {
    assert.throws(
      () => validateAirport({ iataCode: '', name: '   ', cityId: null }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('iataCode' in errorFields);
        assert.ok('name' in errorFields);
        assert.ok('cityId' in errorFields);
        return true;
      }
    );
  });

  it('lanza AppError 422 si el codigo IATA tiene formato incorrecto o name es muy largo', () => {
    assert.throws(
      () =>
        validateAirport({
          iataCode: 'MADRID',
          name: 'a'.repeat(200),
          cityId: -5,
        }),
      (err) => {
        assert.ok(err instanceof AppError);
        assert.equal(err.status, 422);
        const errorFields = err.details || err.fields || {};
        assert.ok('iataCode' in errorFields);
        assert.ok('name' in errorFields);
        assert.ok('cityId' in errorFields);
        return true;
      }
    );
  });
});