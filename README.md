# Laboratorios Virens — web

Rediseño completo de `lvirens.com`.
Documento maestro del proyecto: **`docs/00-auditoria-y-rediseno-virens.md`** (auditoría, arquitectura, copy, sistema visual y wireframes).

## Stack

| | |
|---|---|
| Framework | Next.js 15 · App Router |
| Lenguaje | TypeScript (`strict`, `noUncheckedIndexedAccess`) |
| Estilos | Tailwind CSS v4 · tokens en `src/app/globals.css` |
| Animación | Framer Motion |
| Contenido | Módulos tipados en `src/content/` · blog pendiente de CMS |

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Estructura

```
src/
├── app/                    Rutas (App Router) + sitemap + robots
├── components/
│   ├── layout/             Header · MenuOverlay · AnchorNav · Footer
│   ├── sections/           Bloques de página, uno por patrón de layout
│   └── ui/                 Primitivas: Section · Container · Button · Eyebrow · Reveal · iconos
├── config/                 site.ts (datos de empresa) · navigation.ts
├── content/                Contenido extraído y verificado, tipado
└── lib/                    Tipos y utilidades
```

## Reglas del proyecto

1. **Ningún hex, tamaño de fuente ni espaciado fuera de `globals.css`.** Los tokens son la única fuente de verdad del sistema visual.
2. **Ningún texto dentro del JSX.** Todo el contenido vive en `src/content/*` para poder traducirlo y para que el cliente lo revise sin leer código.
3. **Ningún dato inventado.** Cada módulo de contenido indica si el texto es literal de la web actual, una reescritura o un dato pendiente de confirmar. Los marcados `unverified` no se renderizan por defecto.
4. **Sin sombras y sin radios**, salvo botones y círculos de numeración.
5. **Ninguna sección repite fondo ni layout de la anterior.** El ritmo es parte del diseño, no una casualidad.
6. **Accesibilidad como requisito:** foco visible, `prefers-reduced-motion` respetado, vídeo mudo con poster, menú navegable por teclado.

## Pendiente

- [ ] Vídeos de hero (`public/video/`) y fotografía de planta y laboratorio (`public/img/`)
- [ ] SVG definitivos del logo (color y blanco) y de las siluetas de envase
- [ ] Formulario de contacto corto con validación en servidor
- [ ] CMS del blog, con categorías, editable por el cliente
- [ ] i18n `es` / `en`
- [ ] Páginas legales
- [ ] Confirmación del cliente de los datos listados en `site.pendingClientConfirmation`
