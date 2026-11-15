'use client';

import { Marca } from './Marca';
import { useTienda } from './TiendaProvider';

export function Encabezado() {
  const { bolsa, abrirBolsa } = useTienda();
  return (
    <header className="top">
      <div className="wrap">
        <Marca />
        <nav className="nav" aria-label="Principal">
          <a href="#nuevos">Nuevos ingresos</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#pagos">Pagos y envíos</a>
        </nav>
        <button type="button" className="bolsa-btn" onClick={abrirBolsa} aria-haspopup="dialog">
          Mis caprichos <span className="n" aria-label={`${bolsa.length} prendas`}>{bolsa.length}</span>
        </button>
      </div>
    </header>
  );
}
