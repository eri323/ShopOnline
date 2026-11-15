import type { Foto, Prenda } from '@/lib/tipos';

/*
 * PRECIOS Y TALLAS DE MUESTRA: la tienda no publica precios ("pregunta precio y tallas").
 * Reemplazar con los reales antes de entregar.
 *
 * Fotos tomadas de las publicaciones de @caprichosshop25, solo para esta propuesta.
 * Son las miniaturas del perfil (máx. 640 px): pedir los originales a la tienda.
 */

const foto = (n: string, ancho: number, alto: number, foco: string, alt: string, zoom?: number): Foto => ({
  src: `/fotos/ig-${n}.jpg`, ancho, alto, foco, alt, zoom,
});

export const PRENDAS: Prenda[] = [
  {
    id: 'crop-rayas-blanco', nombre: 'Crop top a rayas blanco y negro', categoria: 'Tops', precio: 42000,
    tallas: ['S', 'M', 'L'], descripcion: ['Tejido de punto', 'Manga corta, largo al ombligo'], nueva: true,
    foto: foto('01', 480, 640, '60% 20%', 'Modelo con crop top a rayas blanco y negro y short negro'),
  },
  {
    id: 'top-halter-negro', nombre: 'Top halter negro anudado', categoria: 'Tops', precio: 38000,
    tallas: ['XS', 'S', 'M'], descripcion: ['Se amarra al cuello', 'Espalda descubierta'], nueva: true,
    foto: foto('02', 480, 640, '50% 15%', 'Modelo con top halter negro y jean claro'),
  },
  {
    id: 'body-azul-cielo', nombre: 'Body manga corta azul cielo', categoria: 'Bodys', precio: 42000,
    tallas: ['S', 'M', 'L'], descripcion: ['Se ajusta al cuerpo', 'Broche abajo'], nueva: true,
    foto: foto('03', 360, 640, '50% 25%', 'Modelo con body azul cielo y jean'),
  },
  {
    id: 'polo-crop-rayas', nombre: 'Polo crop a rayas', categoria: 'Tops', precio: 46000,
    tallas: ['S', 'M'], descripcion: ['Cuello camisero blanco', 'Rayas azul, vino y gris'], nueva: true,
    foto: foto('04', 480, 640, '60% 20%', 'Modelo con polo crop a rayas y short de jean'),
  },
  {
    id: 'conjunto-blanco-nudos', nombre: 'Conjunto blanco con botones de nudo', categoria: 'Conjuntos', precio: 139000,
    tallas: ['S', 'M', 'L'], descripcion: ['Chaqueta y pantalón', 'Botones de nudo en rosa'], nueva: true,
    foto: foto('05', 360, 640, '50% 30%', 'Modelo con conjunto blanco de chaqueta y pantalón'),
  },
  {
    id: 'conjunto-negro-tortuga', nombre: 'Conjunto negro cuello tortuga', categoria: 'Conjuntos', precio: 118000,
    tallas: ['S', 'M', 'L'], descripcion: ['Blusa manga larga ajustada', 'Pantalón ancho con cinturón'], nueva: false,
    foto: foto('08', 360, 640, '62% 30%', 'Modelo con blusa negra cuello tortuga y pantalón negro'),
  },
  {
    id: 'falda-blanca-boleros', nombre: 'Falda short blanca de boleros', categoria: 'Faldas', precio: 54000,
    tallas: ['XS', 'S', 'M'], descripcion: ['Con short por dentro', 'Tiro alto'], nueva: false,
    foto: foto('09', 360, 640, '50% 55%', 'Modelo con falda blanca de boleros y camiseta estampada'),
  },
  {
    id: 'vestido-negro-corto', nombre: 'Vestido corto negro escote halter', categoria: 'Vestidos', precio: 89000,
    tallas: ['S', 'M'], descripcion: ['Se amarra al cuello', 'Falda con vuelo'], nueva: false,
    foto: foto('12', 640, 640, '54% 72%', 'Modelo con vestido corto negro', 2.6),
  },
  {
    id: 'jean-tiro-alto-rotos', nombre: 'Jean tiro alto con rotos', categoria: 'Pantalones', precio: 95000,
    tallas: ['6', '8', '10', '12'], descripcion: ['Tiro alto, bota recta', 'Rotos en las rodillas'], nueva: false,
    foto: foto('02', 480, 640, '35% 85%', 'Jean azul claro de tiro alto con rotos', 1.9),
  },
];
