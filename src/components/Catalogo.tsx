'use client';

import { useState } from 'react';
import { PRENDAS } from '@/data/prendas';
import { categoriasConPrendas, filtrar, filtroAUrl, mensajeVacio, resumen, tallasConPrendas, type Filtro } from '@/lib/filtros';
import { formatoCOP } from '@/lib/tipos';
import { FotoPrenda } from './FotoPrenda';
import { useTienda } from './TiendaProvider';

const CATEGORIAS = categoriasConPrendas(PRENDAS);
const TALLAS = tallasConPrendas(PRENDAS);

/** Catálogo con filtros por prenda y por talla. El filtro queda en la dirección para compartirlo. */
export function Catalogo({ inicial }: { inicial: Filtro }) {
  const { abrirFicha } = useTienda();
  const [filtro, setFiltro] = useState<Filtro>(inicial);
  const lista = filtrar(PRENDAS, filtro);

  function cambiar(siguiente: Filtro) {
    setFiltro(siguiente);
    try {
      history.replaceState(history.state, '', location.pathname + filtroAUrl(siguiente) + '#catalogo');
    } catch {
      // Sin history (vista previa embebida): el filtro igual funciona.
    }
  }

  return (
    <section className="bloque" id="catalogo" aria-labelledby="tCat">
      <div className="wrap">
        <div className="cabeza">
          <h2 id="tCat">Todo lo <em>disponible</em></h2>
        </div>
        <div className="filtros">
          <div className="fila" role="group" aria-label="Filtrar por prenda">
            <button type="button" className="chip" aria-pressed={!filtro.categoria} onClick={() => cambiar({ ...filtro, categoria: null })}>
              Todo
            </button>
            {CATEGORIAS.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={filtro.categoria === c} onClick={() => cambiar({ ...filtro, categoria: c })}>
                {c}
              </button>
            ))}
          </div>
          <div className="fila" role="group" aria-label="Filtrar por talla">
            <span className="rotulo" aria-hidden="true">Mi talla</span>
            {TALLAS.map((t) => (
              <button
                key={t}
                type="button"
                className="chip talla"
                aria-pressed={filtro.talla === t}
                onClick={() => cambiar({ ...filtro, talla: filtro.talla === t ? null : t })}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <p className="resultado" aria-live="polite">{resumen(lista.length, filtro)}</p>
        <div className="grilla">
          {lista.length === 0 && <p className="vacio">{mensajeVacio(filtro)}</p>}
          {lista.map((p) => (
            <button
              key={p.id}
              type="button"
              className="card"
              onClick={() => abrirFicha(p)}
              aria-label={`${p.nombre}, ${formatoCOP(p.precio)}, tallas ${p.tallas.join(', ')}`}
            >
              <FotoPrenda foto={p.foto} sizes="(max-width: 520px) 50vw, (max-width: 1280px) 25vw, 300px" decorativa>
                {p.nueva && <span className="sello">Nuevo</span>}
              </FotoPrenda>
              <div className="linea1">
                <h3>{p.nombre}</h3>
                <span className="precio">{formatoCOP(p.precio)}</span>
              </div>
              <div className="tallas">Tallas {p.tallas.join(' · ')}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
