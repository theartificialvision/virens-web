# Guía para principiantes — la web de Virens sin miedo al código

Para quien diseña y no programa. Lo primero, lo importante:

> **No vas a romper la web.** Todo lo que hagas queda primero en una web de
> pruebas. lvirens.com solo cambia cuando tú dices «publica». Y cualquier
> cambio se puede deshacer: el historial guarda todas las versiones.

Tú no escribes código. Le dices a Claude lo que quieres, como se lo dirías a un
desarrollador del estudio, y él lo hace siguiendo las reglas de diseño del
proyecto. Tu trabajo es el de siempre: mirar, decidir y pedir ajustes.

---

## 1. Seis palabras que vas a oír (y lo que significan de verdad)

| Palabra | Qué es, en diseño |
|---|---|
| **Repositorio** | La carpeta del proyecto, guardada en la nube (GitHub) con todo su historial. Como un archivo de Figma con historial de versiones. |
| **GitHub** | El sitio donde vive esa carpeta en la nube. |
| **Rama** | Una versión paralela del proyecto. Aquí hay dos: **`v2`** (pruebas) y **`produccion`** (lo que ve el público). |
| **Commit** | Guardar un punto de control con una frase que explica el cambio. Como «guardar versión» con nombre. |
| **Push / subir** | Mandar esos puntos de control a GitHub. |
| **Publicar** | Pasar lo de pruebas a la web real. Aquí lo hace todo un botón (o Claude). |

Webs:
- **Pruebas:** https://virenslab.netlify.app (se actualiza sola al subir a `v2`).
- **Real:** https://lvirens.com (solo cambia al publicar).

---

## 2. Cuentas que necesitas (una sola vez)

1. **GitHub**: crea una cuenta gratis en https://github.com/signup.
   Pásale tu usuario a Ignacio: te invitará al proyecto y te llegará un correo
   → **Accept invitation**.
2. **Claude**: tu cuenta (con un plan que incluya Claude Code).

No necesitas cuentas de cdmon, Netlify ni FTP: eso ya está conectado y
funciona solo.

---

## 3. Preparar el Mac (una sola vez, ~20 minutos)

Se trabaja desde la **app de Claude para Mac**, en su pestaña **Code**: ahí
Claude trabaja sobre la carpeta del proyecto en tu Mac y te enseña la web
mientras la cambia. Necesitas tres programas:

1. **Node.js** — el motor que hace funcionar la web en tu Mac.
   https://nodejs.org → botón «LTS» → instalar como cualquier app.
2. **GitHub Desktop** — la forma visual de conectar tu Mac con GitHub.
   https://desktop.github.com → descargar → arrastrar a Aplicaciones.
3. **App de Claude** — https://claude.ai/download, inicia sesión con tu cuenta.

### Conectar con GitHub y traer el proyecto (GitHub Desktop)

*Esto es «conectar GitHub»: se hace una vez y queda guardado.*

1. Abre **GitHub Desktop** → **Sign in to GitHub.com** → se abre el navegador
   → **Authorize**. Si pregunta nombre y email para «Git», pon los tuyos.
2. **File → Clone Repository…** → pestaña **GitHub.com** → elige
   `theartificialvision/virens-web` (aparece cuando hayas aceptado la
   invitación) → como carpeta, por ejemplo `Documentos/virens-web` → **Clone**.
3. Arriba, en **Current Branch**, elige **`v2`**. Es la rama de trabajo.

### Abrir el proyecto en Claude

1. App de Claude → pestaña **Code**.
2. Elige trabajar en **tu Mac** (sesión local) y selecciona la carpeta
   `Documentos/virens-web`.
3. Claude lee solo las reglas del proyecto (`CLAUDE.md`). Para comprobar que
   todo va, pídele: **«arranca la web y enséñamela»**. La primera vez instala
   lo necesario (tarda unos minutos) y te la muestra en localhost:3000.

Si en algún paso pide permiso para ejecutar algo («Allow»), es normal: Claude
pide permiso antes de hacer cosas en tu Mac. Si dudas, pregúntale qué hace ese
comando antes de aceptarlo.

---

## 4. El día a día (5 pasos)

Todo se pide a Claude en la pestaña Code, en lenguaje normal.

1. **Traer lo último** (por si alguien cambió algo): «trae lo último de v2».
2. **Pedir el cambio.** Sé concreto y visual, como con un desarrollador:
   - «En la home, el titular del bloque de capacidades: súbelo un tamaño.»
   - «Cambia esta foto (la arrastras al chat) por la de Galénica en Tech.»
   - «El espacio entre certificaciones y el CTA me parece excesivo en móvil.»
   - Puedes mandarle **capturas** con flechas o notas: las entiende.
3. **Mirarlo:** «enséñame cómo queda en escritorio y en móvil». También puedes
   abrir http://localhost:3000 en tu navegador mientras la web está arrancada.
4. **Guardar en pruebas:** «guarda y sube a v2». En 1-2 minutos está en
   https://virenslab.netlify.app — enséñaselo a quien tenga que aprobarlo.
5. **Publicar en lvirens.com** (solo cuando esté aprobado):
   **«publica en lvirens.com»**. Claude lo publica y te confirma cuando esté.

> Si alguna vez Claude dice que no puede subir a GitHub (permiso o
> contraseña), abre **GitHub Desktop**: verás los cambios guardados y un botón
> **Push origin** arriba. Púlsalo y listo.

---

## 5. Si algo sale mal

- **No te gusta el cambio:** «deshaz el último cambio» o «vuelve a como
  estaba esta mañana».
- **Algo se ve roto en pruebas:** captura → «esto se ve así, arréglalo».
  Mientras no publiques, lvirens.com no se entera.
- **Ya publicaste y está mal:** «vuelve lvirens.com a la versión anterior
  y publica».
- **Ves mensajes raros en rojo:** pídele a Claude que te explique qué pasa
  en palabras sencillas. Casi siempre es un paso que falta y él te lo dice.
- **Duda de diseño o de datos** (cifras, certificados, años): Claude no se los
  inventa; te preguntará. Es a propósito.

---

## 6. Qué decide el sistema por ti (y conviene saberlo)

Claude sigue unas reglas escritas en `CLAUDE.md` para que la web no pierda
coherencia. Las que más notarás como diseñador:

- **Colores, tamaños y espacios son «tokens»** (variables con nombre) en un
  único sitio. Si pides un color nuevo, lo añadirá como token, no suelto.
  Ventaja: cambias un token y cambia en toda la web.
- **Sin sombras ni esquinas redondeadas**, salvo botones y algún elemento
  flotante concreto.
- **Nada de rejillas de tarjetas.** Mucho aire: mínimo 120 px entre bloques
  en escritorio.
- **Los textos viven aparte del diseño** (en `src/content/`), en español e
  inglés. Si cambias un texto en español, pide también el inglés.

Si alguna regla te frena, díselo a Claude: te explicará el porqué y te
propondrá alternativas. Las reglas se pueden cambiar, pero a conciencia.

---

## 7. Primer día: prueba sin riesgo

Pídele a Claude, literalmente:

> Lee EMPEZAR-AQUI.md, GUIA-PRINCIPIANTES.md, TRASPASO.md y las últimas
> entradas de HISTORIAL.md. Resúmeme en cinco líneas cómo está la web y cómo
> se publica. No cambies nada todavía.

Y después un cambio pequeño de práctica, sin publicar:

> Cambia el color del botón «Contactar ahora» a otro azul de la paleta,
> enséñamelo y luego deshazlo.

Con eso ya has hecho el ciclo completo.
