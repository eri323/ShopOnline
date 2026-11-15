/** Logo de texto: "Caprichos" en letra a mano y BOUTIQUE espaciado debajo, como su perfil. */
export function Marca({ etiqueta = 'Caprichos Boutique, inicio' }: { etiqueta?: string }) {
  return (
    <a className="marca" href="#inicio" aria-label={etiqueta}>
      <b>Caprichos</b>
      <small>BOUTIQUE</small>
    </a>
  );
}
