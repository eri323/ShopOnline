import { CATEGORIAS, TALLAS, esCategoria, esTalla, type Categoria, type Prenda, type Talla } from './tipos';

export type Filtro = { categoria: Categoria | null; talla: Talla | null };

/** Categorías que tienen al menos una prenda, en el orden de CATEGORIAS. */
export function categoriasConPrendas(prendas: Prenda[]): Categoria[] {
  const usadas = new Set(prendas.map((p) => p.categoria));
  return CATEGORIAS.filter((c) => usadas.has(c));
}

/** Tallas que tiene al menos una prenda, en el orden de TALLAS. */
export function tallasConPrendas(prendas: Prenda[]): Talla[] {
  const usadas = new Set(prendas.flatMap((p) => p.tallas));
  return TALLAS.filter((t) => usadas.has(t));
}

export function filtrar(prendas: Prenda[], { categoria, talla }: Filtro): Prenda[] {
  return prendas.filter((p) => (!categoria || p.categoria === categoria) && (!talla || p.tallas.includes(talla)));
}

export function resumen(cantidad: number, { categoria, talla }: Filtro): string {
  if (!cantidad) return '';
  const base = `${cantidad} ${cantidad === 1 ? 'prenda' : 'prendas'}`;
  return base + (categoria ? ` en ${categoria.toLowerCase()}` : '') + (talla ? ` en talla ${talla}` : '');
}

export function mensajeVacio({ categoria, talla }: Filtro): string {
  const que = categoria ? categoria.toLowerCase() : 'prendas';
  return `No hay ${que}${talla ? ` en talla ${talla}` : ''} ahora mismo. Escríbenos y te avisamos cuando lleguen.`;
}

/** Lee ?prenda=Tops&talla=M. Ignora valores que no existen. */
export function filtroDesdeUrl(busqueda: string): Filtro {
  const q = new URLSearchParams(busqueda);
  const categoria = q.get('prenda');
  const talla = q.get('talla');
  return { categoria: esCategoria(categoria) ? categoria : null, talla: esTalla(talla) ? talla : null };
}

export function filtroAUrl({ categoria, talla }: Filtro): string {
  const q = new URLSearchParams();
  if (categoria) q.set('prenda', categoria);
  if (talla) q.set('talla', talla);
  const s = q.toString();
  return s ? `?${s}` : '';
}
