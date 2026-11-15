import { describe, expect, it } from 'vitest';
import { PRENDAS } from '@/data/prendas';
import { WHATSAPP, linkWhatsApp, mensajeBolsa, mensajeSinTalla, mensajeUna } from './whatsapp';

const crop = PRENDAS.find((p) => p.id === 'crop-rayas-blanco')!;
const jean = PRENDAS.find((p) => p.id === 'jean-tiro-alto-rotos')!;

describe('mensajeUna', () => {
  it('arma el texto exacto con el link a la prenda', () => {
    expect(mensajeUna(crop, 'M', 'https://caprichos.vercel.app/')).toBe(
      'Hola Caprichos, quiero pedir:\n• Crop top a rayas blanco y negro · talla M · $42.000\nhttps://caprichos.vercel.app/#p-crop-rayas-blanco',
    );
  });

  it('sin una dirección pública no agrega link', () => {
    expect(mensajeUna(crop, 'S')).not.toContain('\n' + 'http');
    expect(mensajeUna(crop, 'S', 'file:///C:/demo/index.html')).not.toContain('file:');
  });
});

describe('mensajeSinTalla', () => {
  it('pregunta por tallas sin inventar una', () => {
    expect(mensajeSinTalla(jean)).toBe('Hola Caprichos, me interesa Jean tiro alto con rotos. ¿Qué tallas tienen?');
  });
});

describe('mensajeBolsa', () => {
  it('lista cada prenda con su talla y suma el total', () => {
    const texto = mensajeBolsa([{ id: crop.id, talla: 'S' }, { id: jean.id, talla: '8' }], PRENDAS);
    expect(texto.split('\n')).toEqual([
      'Hola Caprichos, quiero pedir:',
      '• Crop top a rayas blanco y negro · talla S · $42.000',
      '• Jean tiro alto con rotos · talla 8 · $95.000',
      'Total: $137.000',
      '¿Me confirman disponibilidad y envío?',
    ]);
  });

  it('ignora prendas que ya no existen y no las suma', () => {
    const texto = mensajeBolsa([{ id: 'ya-no-existe', talla: 'S' }, { id: crop.id, talla: 'M' }], PRENDAS);
    expect(texto).not.toContain('ya-no-existe');
    expect(texto).toContain('Total: $42.000');
  });
});

describe('linkWhatsApp', () => {
  it('usa el número de la bio y conserva tildes, # y saltos de línea', () => {
    const texto = '¿Tienen talla 8? #jean\nGracias';
    const link = linkWhatsApp(texto);
    expect(link.startsWith(`https://wa.me/${WHATSAPP}?text=`)).toBe(true);
    expect(new URL(link).searchParams.get('text')).toBe(texto);
  });
});
