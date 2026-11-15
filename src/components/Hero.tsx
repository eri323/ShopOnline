'use client';

import { useState } from 'react';
import { PRENDAS } from '@/data/prendas';
import { formatoCOP } from '@/lib/tipos';
import { FotoPrenda } from './FotoPrenda';
import { FlechaDer, FlechaIzq } from './Iconos';
import { useTienda } from './TiendaProvider';

const NUEVAS = PRENDAS.filter((p) => p.nueva);
const dos = (n: number) => String(n).padStart(2, '0');

/** Portada: la prenda nueva colgada al frente con su etiqueta, y las vecinas a los lados. */
export function Hero() {
  const { abrirFicha } = useTienda();
  const [i, setI] = useState(0);
  const n = NUEVAS.length;
  const p = NUEVAS[i];
  const antes = NUEVAS[(i - 1 + n) % n];
  const despues = NUEVAS[(i + 1) % n];
  const mover = (k: number) => setI((x) => (x + k + n) % n);

  return (
    <section className="hero" id="nuevos" aria-labelledby="titulo">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Nuevos ingresos · Entrega inmediata</p>
          <h1 id="titulo">
            Moda que resalta tu <em>esencia</em>
          </h1>
          <p className="lead">
            Ropa americana y nacional para mujer. Escoge tu talla aquí y te la mandamos desde Medellín a cualquier parte de
            Colombia.
          </p>
          <a className="cta" href="#catalogo">Ver el catálogo</a>
          <a className="link" href="#pagos">Cómo pagar</a>
        </div>

        <div>
          <div className="escena" aria-roledescription="carrusel" aria-label="Nuevos ingresos">
            <div className="percha" aria-hidden="true" />
            <button type="button" className="colgada lado c-izq" onClick={() => mover(-1)} aria-label={`Ver ${antes.nombre}`}>
              <div className="gancho" />
              <FotoPrenda foto={antes.foto} sizes="(max-width: 560px) 30vw, 14vw" decorativa />
            </button>
            <div className="colgada c-centro">
              <div className="gancho" aria-hidden="true" />
              <FotoPrenda foto={p.foto} sizes="(max-width: 560px) 64vw, (max-width: 860px) 40vw, 22vw" prioridad />
              <div className="etiqueta">
                <div className="num">N.º {dos(i + 1)} · {p.categoria}</div>
                <div className="nom">{p.nombre}</div>
                <div className="pre">{formatoCOP(p.precio)}</div>
                <button type="button" onClick={() => abrirFicha(p)}>Elegir talla</button>
              </div>
            </div>
            <button type="button" className="colgada lado c-der" onClick={() => mover(1)} aria-label={`Ver ${despues.nombre}`}>
              <div className="gancho" />
              <FotoPrenda foto={despues.foto} sizes="(max-width: 560px) 30vw, 14vw" decorativa />
            </button>
          </div>
          <div className="hero-ctrl">
            <button type="button" className="redondo" onClick={() => mover(-1)} aria-label="Prenda anterior"><FlechaIzq /></button>
            <span aria-live="polite">{dos(i + 1)} / {dos(n)}</span>
            <button type="button" className="redondo" onClick={() => mover(1)} aria-label="Prenda siguiente"><FlechaDer /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
