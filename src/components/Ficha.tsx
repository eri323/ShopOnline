'use client';

import { useEffect, useRef, useState } from 'react';
import { formatoCOP, type Prenda, type Talla } from '@/lib/tipos';
import { linkWhatsApp, mensajeSinTalla, mensajeUna } from '@/lib/whatsapp';
import { FotoPrenda } from './FotoPrenda';
import { Cerrar } from './Iconos';
import { useTienda } from './TiendaProvider';

/** Ficha de prenda en un <dialog> nativo: foco atrapado, Esc para cerrar y fondo inerte. */
export function Ficha() {
  const { fichaAbierta, cerrarFicha } = useTienda();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (fichaAbierta && !d.open) d.showModal();
    if (!fichaAbierta && d.open) d.close();
  }, [fichaAbierta]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="fNom"
      onClose={cerrarFicha}
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrarFicha();
      }}
    >
      {/* La clave reinicia la talla elegida al cambiar de prenda. */}
      {fichaAbierta && <Contenido key={fichaAbierta.id} prenda={fichaAbierta} />}
    </dialog>
  );
}

function Contenido({ prenda }: { prenda: Prenda }) {
  const { cerrarFicha, agregar, avisar } = useTienda();
  const [talla, setTalla] = useState<Talla | null>(prenda.tallas.length === 1 ? prenda.tallas[0] : null);
  const [aviso, setAviso] = useState('¿Dudas con la talla? Escríbenos tus medidas y te asesoramos.');
  const primeraTalla = useRef<HTMLButtonElement>(null);
  const base = typeof window === 'undefined' ? undefined : window.location.origin + window.location.pathname;

  function agregarABolsa() {
    if (!talla) {
      setAviso('Elige una talla primero.');
      primeraTalla.current?.focus();
      return;
    }
    agregar(prenda.id, talla);
    cerrarFicha();
    avisar(`${prenda.nombre} (talla ${talla}) está en tus caprichos`);
  }

  return (
    <>
      <button type="button" className="redondo cerrar" onClick={cerrarFicha} aria-label="Cerrar"><Cerrar /></button>
      <div className="ficha">
        <FotoPrenda foto={prenda.foto} sizes="(max-width: 720px) 100vw, 460px" />
        <div className="cuerpo">
          <p className="eyebrow">{prenda.categoria}{prenda.nueva ? ' · Nuevo ingreso' : ''}</p>
          <h3 id="fNom">{prenda.nombre}</h3>
          <div className="precio">{formatoCOP(prenda.precio)}</div>
          <ul>{prenda.descripcion.map((d) => <li key={d}>{d}</li>)}</ul>
          <div>
            <div className="rotulo" id="fTallaRot">Elige tu talla</div>
            <div className="fila envuelve" role="radiogroup" aria-labelledby="fTallaRot">
              {prenda.tallas.map((t, i) => (
                <button
                  key={t}
                  ref={i === 0 ? primeraTalla : undefined}
                  type="button"
                  role="radio"
                  aria-checked={talla === t}
                  className="chip talla"
                  onClick={() => setTalla(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <p className="aviso" aria-live="polite">{aviso}</p>
          <div className="acciones">
            <button type="button" className="cta" onClick={agregarABolsa}>Agregar a mis caprichos</button>
            <a
              className="btn2"
              href={linkWhatsApp(talla ? mensajeUna(prenda, talla, base) : mensajeSinTalla(prenda))}
              target="_blank"
              rel="noopener"
            >
              {talla ? 'Pedir solo esta por WhatsApp' : 'Preguntar por WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
