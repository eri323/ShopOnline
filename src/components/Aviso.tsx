'use client';

import { useTienda } from './TiendaProvider';

/** Confirmación corta abajo de la pantalla. Siempre está en el DOM para que el lector de pantalla la anuncie. */
export function Aviso() {
  const { aviso } = useTienda();
  return (
    <div className={`toast${aviso ? ' ver' : ''}`} role="status">
      {aviso}
    </div>
  );
}
