'use client';

import { useEffect, useRef } from 'react';
import { PRENDAS } from '@/data/prendas';
import { totalBolsa } from '@/lib/bolsa';
import { formatoCOP } from '@/lib/tipos';
import { linkWhatsApp, mensajeBolsa } from '@/lib/whatsapp';
import { FotoPrenda } from './FotoPrenda';
import { Cerrar } from './Iconos';
import { useTienda } from './TiendaProvider';

const porId = new Map(PRENDAS.map((p) => [p.id, p]));

/** Panel lateral con las prendas elegidas y el pedido listo para WhatsApp. */
export function Bolsa() {
  const { bolsa, quitar, bolsaAbierta, cerrarBolsa } = useTienda();
  const cerrar = useRef<HTMLButtonElement>(null);
  const vacia = bolsa.length === 0;

  // Al abrir, el foco va al botón de cerrar; al cerrar vuelve a donde estaba. Esc cierra.
  useEffect(() => {
    if (!bolsaAbierta) return;
    const antes = document.activeElement as HTMLElement | null;
    cerrar.current?.focus();
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && cerrarBolsa();
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      antes?.focus();
    };
  }, [bolsaAbierta, cerrarBolsa]);

  return (
    <>
      <div className={`velo${bolsaAbierta ? ' abierto' : ''}`} onClick={cerrarBolsa} aria-hidden="true" />
      <aside className={`panel${bolsaAbierta ? ' abierto' : ''}`} role="dialog" aria-modal="true" aria-labelledby="tBolsa" inert={!bolsaAbierta}>
        <header>
          <h2 id="tBolsa">Mis <em>caprichos</em></h2>
          <button ref={cerrar} type="button" className="redondo" onClick={cerrarBolsa} aria-label="Cerrar"><Cerrar /></button>
        </header>
        <div className="items">
          {vacia && <p className="vacio">Todavía no tienes caprichos. Elige una prenda y su talla.</p>}
          {bolsa.map((linea, i) => {
            const p = porId.get(linea.id);
            if (!p) return null;
            return (
              <div className="item" key={`${linea.id}-${linea.talla}-${i}`}>
                <FotoPrenda foto={p.foto} sizes="64px" decorativa />
                <div>
                  <b>{p.nombre}</b>
                  <small>Talla {linea.talla} · {formatoCOP(p.precio)}</small>
                </div>
                <button type="button" className="quitar" onClick={() => quitar(i)} aria-label={`Quitar ${p.nombre}`}>Quitar</button>
              </div>
            );
          })}
        </div>
        <footer>
          <div className="total"><span>Total</span><span>{formatoCOP(totalBolsa(bolsa, PRENDAS))}</span></div>
          {vacia ? (
            <span className="cta apagado" aria-disabled="true">Enviar pedido por WhatsApp</span>
          ) : (
            <a className="cta" href={linkWhatsApp(mensajeBolsa(bolsa, PRENDAS))} target="_blank" rel="noopener">
              Enviar pedido por WhatsApp
            </a>
          )}
          <small className="tenue">Te respondemos con disponibilidad y costo de envío.</small>
        </footer>
      </aside>
    </>
  );
}
