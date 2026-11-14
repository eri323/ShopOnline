# ShopOnline

Vitrina de demos de tiendas online para negocios de ropa que hoy venden solo por Instagram y WhatsApp.

**`main` es solo el boceto del repo.** No tiene código: cada tienda vive en su propia rama, con su demo completa. Si una tienda compra, su rama se mueve a un repo propio y aquí se borra.

## Ramas

| Rama | Tienda | Estado |
|---|---|---|
| `caprichos-boutique` | Caprichos Boutique · @caprichosshop25 (Medellín) | Demo |

## Qué tiene cada demo

- Catálogo con filtros por prenda y por talla.
- Ficha de prenda con selección de talla.
- Bolsa que arma un solo pedido por WhatsApp, con total.
- Pagos y envíos tomados de las historias destacadas de la tienda.
- Sin pasarela de pago ni base de datos: el pedido se cierra por WhatsApp, como ya trabaja la tienda.
- `noindex`: las demos no salen en buscadores.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Vitest.

## Nueva tienda

```bash
git switch --orphan <nombre-de-la-tienda>
```

Copiar la base de otra rama, cambiar los datos en `src/data/` y los colores y fuentes en `src/app/`.

## Cuando una tienda compra

```bash
git push git@github.com:<cuenta>/<repo-nuevo>.git <rama>:main
git push origin --delete <rama>
```
