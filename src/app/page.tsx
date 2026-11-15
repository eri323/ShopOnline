import { Aviso } from '@/components/Aviso';
import { Bolsa } from '@/components/Bolsa';
import { BotonWhatsApp } from '@/components/BotonWhatsApp';
import { Catalogo } from '@/components/Catalogo';
import { Encabezado } from '@/components/Encabezado';
import { Ficha } from '@/components/Ficha';
import { Hero } from '@/components/Hero';
import { Pagos, Pie } from '@/components/PagosYPie';
import { TiendaProvider } from '@/components/TiendaProvider';
import { filtroDesdeUrl } from '@/lib/filtros';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Inicio({ searchParams }: Props) {
  // El filtro llega en la dirección (?prenda=Tops&talla=M) para que un link compartido abra filtrado.
  const q = await searchParams;
  const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
  const inicial = filtroDesdeUrl(new URLSearchParams({ prenda: uno(q.prenda), talla: uno(q.talla) }).toString());

  return (
    <TiendaProvider>
      <Encabezado />
      <main id="inicio">
        <Hero />
        <Catalogo inicial={inicial} />
        <Pagos />
      </main>
      <Pie />
      <Ficha />
      <Bolsa />
      <BotonWhatsApp />
      <Aviso />
    </TiendaProvider>
  );
}
