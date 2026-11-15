import { LINK_SALUDO } from '@/lib/whatsapp';

/** Tomado de las historias destacadas de @caprichosshop25. */
export function Pagos() {
  return (
    <section className="bloque" id="pagos" aria-labelledby="tPagos">
      <div className="wrap">
        <div className="cabeza">
          <h2 id="tPagos">Pagos y <em>envíos</em></h2>
        </div>
        <div className="info">
          <div><h3>Contra entrega</h3><p>En Medellín y todo el Valle de Aburrá pagas cuando te llega.</p></div>
          <div><h3>Nequi</h3><p>Transferencia al 320 738 1389.</p></div>
          <div><h3>Bancolombia</h3><p>Cuenta de ahorros. Te pasamos el número por WhatsApp al confirmar.</p></div>
          <div><h3>Envíos</h3><p>A toda Colombia. Domicilios y envíos por WhatsApp al 320 738 1389.</p></div>
        </div>
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="pie">
      <div className="wrap">
        <div>
          <span className="marca" aria-label="Caprichos Boutique"><b>Caprichos</b><small>BOUTIQUE</small></span>
          <p className="peq">© 2026 Caprichos Boutique · Tienda virtual desde Medellín</p>
        </div>
        <div className="derecha">
          <a href="https://www.instagram.com/caprichosshop25/" rel="noopener">@caprichosshop25</a> ·{' '}
          <a href={LINK_SALUDO} target="_blank" rel="noopener">WhatsApp</a>
          <p className="peq">Fotos tomadas de @caprichosshop25. Precios y tallas de ejemplo para esta vista previa.</p>
        </div>
      </div>
    </footer>
  );
}
