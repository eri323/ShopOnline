const base = {
  'aria-hidden': true,
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const FlechaIzq = () => <svg {...base}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const FlechaDer = () => <svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Cerrar = () => <svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>;
