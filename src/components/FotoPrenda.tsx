import Image from 'next/image';
import type { Foto } from '@/lib/tipos';

type Props = {
  foto: Foto;
  /** Ancho aproximado en pantalla, para que Next elija el tamaño de la imagen. */
  sizes: string;
  className?: string;
  /** Solo para la primera foto visible (la del carrusel). */
  prioridad?: boolean;
  /** Decorativa: la prenda ya está nombrada al lado. */
  decorativa?: boolean;
  children?: React.ReactNode;
};

/** Foto recortada al contenedor, centrada en la prenda y con el acercamiento que pida. */
export function FotoPrenda({ foto, sizes, className = '', prioridad, decorativa, children }: Props) {
  return (
    <div className={`foto ${className}`}>
      <Image
        src={foto.src}
        alt={decorativa ? '' : foto.alt}
        fill
        sizes={sizes}
        preload={prioridad}
        style={{
          objectFit: 'cover',
          objectPosition: foto.foco,
          transform: foto.zoom ? `scale(${foto.zoom})` : undefined,
          transformOrigin: foto.foco,
        }}
      />
      {children}
    </div>
  );
}
