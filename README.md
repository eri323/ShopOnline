# Caprichos Boutique · demo

Demo de tienda online para [@caprichosshop25](https://www.instagram.com/caprichosshop25/), tienda de ropa americana y nacional para mujer en Medellín. Rama `caprichos-boutique` de ShopOnline: ver `main` para cómo se organiza el repo.

## Qué hace

- **Portada:** la prenda nueva colgada en un riel con su etiqueta de precio; las vecinas a los lados.
- **Catálogo:** filtros por prenda y por talla. El filtro queda en la dirección (`?prenda=Tops&talla=M`).
- **Ficha:** se elige talla y se pide por WhatsApp, o se agrega a la bolsa. Cada prenda tiene link directo (`/#p-<id>`).
- **Mis caprichos (bolsa):** arma un solo mensaje de WhatsApp con todas las prendas y el total. Se guarda en el navegador.
- **Pagos y envíos:** contra entrega en el Valle de Aburrá, Nequi, Bancolombia, envíos a toda Colombia (de sus historias destacadas).

Pedidos al 315 387 9931 (bio de Instagram). Domicilios y Nequi: 320 738 1389.

## Antes de entregar

- [ ] Precios y tallas reales: hoy son **de muestra** (`src/data/prendas.ts`).
- [ ] Fotos originales de la tienda: las de ahora son miniaturas de Instagram (máx. 640 px) y algunas traen texto encima.
- [ ] Confirmar a qué número llegan los pedidos (`src/lib/whatsapp.ts`).

## Fotos

`public/fotos/` no se sube al repo: son fotos de la tienda tomadas de Instagram y el repo es público. Para correr la demo, copiar ahí `ig-01.jpg … ig-12.jpg` (las que usa `src/data/prendas.ts`).

## Stack y comandos

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Vitest.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # mensajes de WhatsApp, bolsa, filtros y datos
npm run lint
npm run build
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/data/prendas.ts` | Catálogo: prendas, precios, tallas y recorte de cada foto |
| `src/lib/` | Lógica sin React: WhatsApp, bolsa, filtros, tipos (con pruebas) |
| `src/components/` | Portada, catálogo, ficha, bolsa, pagos y pie |
| `src/app/` | Página, fuentes (Marcellus, Karla, Allura) y estilos |
