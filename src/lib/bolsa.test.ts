import { describe, expect, it } from 'vitest';
import { PRENDAS } from '@/data/prendas';
import { sanearBolsa, totalBolsa } from './bolsa';

describe('sanearBolsa', () => {
  it('conserva líneas válidas en orden, incluso la misma prenda en dos tallas', () => {
    const datos = [{ id: 'top-halter-negro', talla: 'S' }, { id: 'top-halter-negro', talla: 'M' }];
    expect(sanearBolsa(datos, PRENDAS)).toEqual(datos);
  });

  it('descarta prendas que no existen, tallas que la prenda no tiene y basura', () => {
    const datos = [
      { id: 'no-existe', talla: 'S' },
      { id: 'top-halter-negro', talla: 'L' },
      { id: 'top-halter-negro', talla: 'XXL' },
      'texto',
      null,
      { id: 'top-halter-negro', talla: 'XS' },
    ];
    expect(sanearBolsa(datos, PRENDAS)).toEqual([{ id: 'top-halter-negro', talla: 'XS' }]);
  });

  it('si lo guardado no es una lista, la bolsa queda vacía', () => {
    expect(sanearBolsa({ id: 'top-halter-negro' }, PRENDAS)).toEqual([]);
    expect(sanearBolsa(null, PRENDAS)).toEqual([]);
  });
});

describe('totalBolsa', () => {
  it('suma el precio de cada línea', () => {
    expect(totalBolsa([{ id: 'top-halter-negro', talla: 'S' }, { id: 'top-halter-negro', talla: 'M' }], PRENDAS)).toBe(76000);
    expect(totalBolsa([], PRENDAS)).toBe(0);
  });
});
