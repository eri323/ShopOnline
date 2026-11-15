import { esTalla, type LineaBolsa, type Prenda } from './tipos';

export const CLAVE_BOLSA = 'caprichos-bolsa';

/*
 * localStorage puede no existir o estar bloqueado (navegador interno de Instagram, modo privado).
 * Leer y guardar nunca lanzan error: sin almacenamiento la bolsa solo no se recuerda.
 */

/** Descarta lo que no tenga forma de línea, prendas que ya no existen y tallas que la prenda no tiene. */
export function sanearBolsa(datos: unknown, prendas: Prenda[]): LineaBolsa[] {
  if (!Array.isArray(datos)) return [];
  const porId = new Map(prendas.map((p) => [p.id, p]));
  return datos.flatMap((x): LineaBolsa[] => {
    if (!x || typeof x !== 'object') return [];
    const { id, talla } = x as Record<string, unknown>;
    const prenda = typeof id === 'string' ? porId.get(id) : undefined;
    if (!prenda || !esTalla(talla) || !prenda.tallas.includes(talla)) return [];
    return [{ id: prenda.id, talla }];
  });
}

export function leerBolsa(prendas: Prenda[]): LineaBolsa[] {
  try {
    return sanearBolsa(JSON.parse(localStorage.getItem(CLAVE_BOLSA) ?? '[]'), prendas);
  } catch {
    return [];
  }
}

export function guardarBolsa(lineas: LineaBolsa[]): void {
  try {
    localStorage.setItem(CLAVE_BOLSA, JSON.stringify(lineas));
  } catch {
    // Sin almacenamiento la página sigue funcionando.
  }
}

export function totalBolsa(lineas: LineaBolsa[], prendas: Prenda[]): number {
  const porId = new Map(prendas.map((p) => [p.id, p.precio]));
  return lineas.reduce((suma, l) => suma + (porId.get(l.id) ?? 0), 0);
}
