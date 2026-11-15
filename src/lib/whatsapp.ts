import { formatoCOP, type LineaBolsa, type Prenda, type Talla } from './tipos';

/** WhatsApp de la bio de @caprichosshop25, en formato internacional sin "+". */
export const WHATSAPP = '573153879931';

/** Nequi y domicilios, según sus historias destacadas. */
export const WHATSAPP_DOMICILIOS = '573207381389';

export function linkWhatsApp(texto: string, numero = WHATSAPP): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

/** Link directo a la prenda. Solo se agrega si la página tiene una dirección pública. */
function linkPrenda(prenda: Prenda, base?: string): string {
  if (!base || !/^https?:\/\//.test(base)) return '';
  return `\n${base.replace(/\/+$/, '')}/#p-${prenda.id}`;
}

export function mensajeUna(prenda: Prenda, talla: Talla, base?: string): string {
  return `Hola Caprichos, quiero pedir:\n• ${prenda.nombre} · talla ${talla} · ${formatoCOP(prenda.precio)}${linkPrenda(prenda, base)}`;
}

export function mensajeSinTalla(prenda: Prenda): string {
  return `Hola Caprichos, me interesa ${prenda.nombre}. ¿Qué tallas tienen?`;
}

/** Pedido completo de la bolsa. Ignora líneas cuya prenda ya no existe. */
export function mensajeBolsa(lineas: LineaBolsa[], prendas: Prenda[]): string {
  const porId = new Map(prendas.map((p) => [p.id, p]));
  const validas = lineas.flatMap((l) => {
    const p = porId.get(l.id);
    return p ? [{ p, talla: l.talla }] : [];
  });
  const filas = validas.map(({ p, talla }) => `• ${p.nombre} · talla ${talla} · ${formatoCOP(p.precio)}`);
  const total = validas.reduce((suma, { p }) => suma + p.precio, 0);
  return ['Hola Caprichos, quiero pedir:', ...filas, `Total: ${formatoCOP(total)}`, '¿Me confirman disponibilidad y envío?'].join('\n');
}

export const LINK_SALUDO = linkWhatsApp('Hola Caprichos, vengo de la página web y tengo una pregunta.');
