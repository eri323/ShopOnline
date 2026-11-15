'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { PRENDAS } from '@/data/prendas';
import { CLAVE_BOLSA, guardarBolsa, leerBolsa } from '@/lib/bolsa';
import type { LineaBolsa, Prenda, Talla } from '@/lib/tipos';

/* ---------- Bolsa: una sola lista compartida, guardada en el navegador ---------- */
const VACIA: LineaBolsa[] = [];
let bolsaActual: LineaBolsa[] | null = null;
const oyentesBolsa = new Set<() => void>();

const leer = () => (bolsaActual ??= leerBolsa(PRENDAS));
function escribir(siguiente: LineaBolsa[]) {
  bolsaActual = siguiente;
  guardarBolsa(siguiente);
  oyentesBolsa.forEach((avisar) => avisar());
}
function suscribirBolsa(avisar: () => void) {
  oyentesBolsa.add(avisar);
  // Otra pestaña cambió la bolsa: se vuelve a leer.
  const alCambiar = (e: StorageEvent) => {
    if (e.key !== CLAVE_BOLSA) return;
    bolsaActual = null;
    avisar();
  };
  window.addEventListener('storage', alCambiar);
  return () => {
    oyentesBolsa.delete(avisar);
    window.removeEventListener('storage', alCambiar);
  };
}

/* ---------- Ficha abierta: vive en el hash (#p-<id>) para que el link de la prenda funcione ---------- */
const oyentesFicha = new Set<() => void>();
function idDesdeHash(): string | null {
  const m = /^#p-(.+)$/.exec(window.location.hash);
  return m && PRENDAS.some((p) => p.id === m[1]) ? m[1] : null;
}
function suscribirFicha(avisar: () => void) {
  oyentesFicha.add(avisar);
  window.addEventListener('hashchange', avisar);
  return () => {
    oyentesFicha.delete(avisar);
    window.removeEventListener('hashchange', avisar);
  };
}
function ponerHash(id: string | null) {
  const { pathname, search } = window.location;
  history.replaceState(history.state, '', pathname + search + (id ? `#p-${id}` : ''));
  oyentesFicha.forEach((avisar) => avisar());
}

type Tienda = {
  bolsa: LineaBolsa[];
  agregar(id: string, talla: Talla): void;
  quitar(indice: number): void;
  fichaAbierta: Prenda | null;
  abrirFicha(prenda: Prenda): void;
  cerrarFicha(): void;
  bolsaAbierta: boolean;
  abrirBolsa(): void;
  cerrarBolsa(): void;
  aviso: string;
  avisar(texto: string): void;
};

const TiendaContext = createContext<Tienda | null>(null);

export function TiendaProvider({ children }: { children: React.ReactNode }) {
  // En el servidor y al hidratar la bolsa está vacía; después se lee del navegador.
  const bolsa = useSyncExternalStore(suscribirBolsa, leer, () => VACIA);
  const fichaId = useSyncExternalStore(suscribirFicha, idDesdeHash, () => null);
  const [bolsaAbierta, setBolsaAbierta] = useState(false);
  const [aviso, setAviso] = useState('');
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);

  const avisar = useCallback((texto: string) => {
    setAviso(texto);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(''), 2600);
  }, []);

  const valor = useMemo<Tienda>(
    () => ({
      bolsa,
      agregar: (id, talla) => escribir([...leer(), { id, talla }]),
      quitar: (indice) => escribir(leer().filter((_, i) => i !== indice)),
      fichaAbierta: PRENDAS.find((p) => p.id === fichaId) ?? null,
      abrirFicha: (prenda) => ponerHash(prenda.id),
      cerrarFicha: () => ponerHash(null),
      bolsaAbierta,
      abrirBolsa: () => setBolsaAbierta(true),
      cerrarBolsa: () => setBolsaAbierta(false),
      aviso,
      avisar,
    }),
    [bolsa, fichaId, bolsaAbierta, aviso, avisar],
  );

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>;
}

export function useTienda(): Tienda {
  const tienda = useContext(TiendaContext);
  if (!tienda) throw new Error('useTienda va dentro de <TiendaProvider>');
  return tienda;
}
