/* Tipos del catálogo. Las categorías y tallas válidas viven solo aquí. */

export const CATEGORIAS = ['Tops', 'Bodys', 'Conjuntos', 'Faldas', 'Vestidos', 'Pantalones'] as const;
export type Categoria = (typeof CATEGORIAS)[number];

/** Orden en que se muestran los chips de talla: letras primero, luego tallas de pantalón. */
export const TALLAS = ['XS', 'S', 'M', 'L', '6', '8', '10', '12'] as const;
export type Talla = (typeof TALLAS)[number];

export type Foto = {
  /** Ruta dentro de /public. */
  src: string;
  ancho: number;
  alto: number;
  /** Punto que debe quedar a la vista al recortar, como object-position. */
  foco: string;
  /** Acercamiento sobre el foco. 1 es la foto completa recortada a la tarjeta. */
  zoom?: number;
  /** Texto alternativo: qué prenda se ve y cómo. */
  alt: string;
};

export type Prenda = {
  /** Identificador estable: se usa en el link de la prenda y en la bolsa guardada. */
  id: string;
  nombre: string;
  categoria: Categoria;
  /** COP, entero. */
  precio: number;
  tallas: Talla[];
  descripcion: string[];
  foto: Foto;
  /** Sale en el carrusel de nuevos ingresos. */
  nueva: boolean;
};

export type LineaBolsa = { id: string; talla: Talla };

/** $45.000, sin decimales, con punto de miles como se escribe en Colombia. */
export function formatoCOP(valor: number): string {
  return '$' + Math.round(valor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function esTalla(valor: unknown): valor is Talla {
  return typeof valor === 'string' && (TALLAS as readonly string[]).includes(valor);
}

export function esCategoria(valor: unknown): valor is Categoria {
  return typeof valor === 'string' && (CATEGORIAS as readonly string[]).includes(valor);
}
