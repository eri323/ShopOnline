import { describe, expect, it } from 'vitest';
import { PRENDAS } from '@/data/prendas';
import { categoriasConPrendas, filtrar, filtroAUrl, filtroDesdeUrl, mensajeVacio, resumen, tallasConPrendas } from './filtros';
import { formatoCOP } from './tipos';

describe('filtrar', () => {
  it('sin filtro devuelve todo', () => {
    expect(filtrar(PRENDAS, { categoria: null, talla: null })).toHaveLength(PRENDAS.length);
  });

  it('combina prenda y talla', () => {
    const r = filtrar(PRENDAS, { categoria: 'Tops', talla: 'XS' });
    expect(r.map((p) => p.id)).toEqual(['top-halter-negro']);
  });

  it('una talla de pantalón solo trae pantalones', () => {
    expect(filtrar(PRENDAS, { categoria: null, talla: '8' }).every((p) => p.categoria === 'Pantalones')).toBe(true);
  });
});

describe('textos del catálogo', () => {
  it('resumen en singular y plural', () => {
    expect(resumen(1, { categoria: 'Vestidos', talla: 'S' })).toBe('1 prenda en vestidos en talla S');
    expect(resumen(9, { categoria: null, talla: null })).toBe('9 prendas');
    expect(resumen(0, { categoria: null, talla: null })).toBe('');
  });

  it('mensaje cuando no hay resultados', () => {
    expect(mensajeVacio({ categoria: 'Faldas', talla: 'L' })).toBe(
      'No hay faldas en talla L ahora mismo. Escríbenos y te avisamos cuando lleguen.',
    );
  });
});

describe('filtro en la dirección', () => {
  it('ida y vuelta', () => {
    const f = { categoria: 'Conjuntos' as const, talla: 'M' as const };
    expect(filtroDesdeUrl(filtroAUrl(f))).toEqual(f);
    expect(filtroAUrl({ categoria: null, talla: null })).toBe('');
  });

  it('ignora valores que no existen', () => {
    expect(filtroDesdeUrl('?prenda=Zapatos&talla=XXL')).toEqual({ categoria: null, talla: null });
  });
});

describe('datos de muestra', () => {
  it('ids únicos, precio entero positivo y al menos una talla', () => {
    expect(new Set(PRENDAS.map((p) => p.id)).size).toBe(PRENDAS.length);
    for (const p of PRENDAS) {
      expect(Number.isInteger(p.precio) && p.precio > 0).toBe(true);
      expect(p.tallas.length).toBeGreaterThan(0);
    }
  });

  it('chips solo de categorías y tallas con prendas', () => {
    expect(categoriasConPrendas(PRENDAS)).toEqual(['Tops', 'Bodys', 'Conjuntos', 'Faldas', 'Vestidos', 'Pantalones']);
    expect(tallasConPrendas(PRENDAS)).toEqual(['XS', 'S', 'M', 'L', '6', '8', '10', '12']);
  });
});

describe('formatoCOP', () => {
  it('punto de miles y sin decimales', () => {
    expect(formatoCOP(139000)).toBe('$139.000');
    expect(formatoCOP(1250000)).toBe('$1.250.000');
    expect(formatoCOP(0)).toBe('$0');
  });
});
