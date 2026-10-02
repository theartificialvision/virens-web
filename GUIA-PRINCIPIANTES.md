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
2. **Claude**: tu cuenta (con plan que incluya Claude Code).

No necesitas cuentas de cdmon, Netlify ni FTP: eso ya está conectado y
funciona solo.

---

## 3. Dos formas de trabajar — elige una

### Opción A · En el Mac del laboratorio con VS Code (recomendada)

Ves la web en tu Mac mientras cambias cosas, al instante.

**Instalar (una vez):**
1. **Node.js**: https://nodejs.org → botón «LTS» → instalar como cualquier app.
2. **VS Code**: https://code.visualstudio.com → descargar → arrastrar a Aplicaciones.
3. Abre VS Code. En la barra izquierda, icono de ramas (**Control de código**)
   → **Clonar repositorio** → **Clonar desde GitHub**.
4. Te pide **iniciar sesión en GitHub**: se abre el navegador → **Authorize**.
   *Esta es «la conexión con GitHub» en esta opción: no hay que configurar
   conectores; VS Code guarda el permiso y ya está.*
5. Elige `theartificialvision/virens-web` y una carpeta donde guardarlo
   (por ejemplo Documentos). Cuando pregunte, **Abrir**.
6. Abajo a la izquierda pone el nombre de la rama. Haz clic y elige **`v2`**
   (si sale `origin/v2`, esa).
7. Aparece un aviso de **extensiones recomendadas** → **Instalar todas**.
   Una es **Claude Code**: ábrela (icono de Claude en la barra) e inicia sesión
   con tu cuenta de Claude.

**Comprobar que todo va:** menú **Terminal → Ejecutar tarea… → «Arrancar web
(localhost:3000)»**. La primera vez tarda un poco. Abre http://localhost:3000
en el navegador: es la web, en tu Mac.

### Opción B · Desde el navegador (claude.ai/code), sin instalar nada

Útil desde cualquier ordenador. No ves la web en local: ves los cambios en la
web de pruebas (Netlify) 1-2 minutos después.

1. Entra en https://claude.ai/code con tu cuenta.
2. **Conectar GitHub**: ve a https://claude.ai/connect-github y autoriza con tu
   cuenta de GitHub. *Esta es «la conexión de conectores» en esta opción.*
   La app de Claude ya está instalada en el repositorio por Ignacio; si al
   empezar no te aparece `virens-web`, pídele que revise el acceso.
3. Nueva sesión → elige el repositorio `theartificialvision/virens-web` y la
   rama **`v2`**.

---

## 4. El día a día (5 pasos)

1. **Traer lo último** (por si alguien cambió algo):
   *Terminal → Ejecutar tarea → «Traer lo último de GitHub (v2)»*.
   O dile a Claude: «trae lo último de v2».
2. **Pedir el cambio a Claude.** Sé concreto y visual, como con un desarrollador:
   - «En la home, el titular del bloque de capacidades: súbelo un tamaño.»
   - «Cambia esta foto (la arrastras al chat) por la de Galénica en Tech.»
   - «El espacio entre certificaciones y el CTA me parece excesivo en móvil.»
   - Puedes mandarle **capturas** con flechas o notas: las entiende.
3. **Mirarlo** en http://localhost:3000 (opción A) o en Netlify (opción B).
   Revisa escritorio y móvil (en el navegador: ⌥⌘I → icono de móvil).
4. **Guardar en pruebas:** dile «guarda y sube a v2». En 1-2 minutos está en
   https://virenslab.netlify.app — enséñaselo a quien tenga que aprobarlo.
5. **Publicar en lvirens.com** (solo cuando esté aprobado): dile
   **«publica en lvirens.com»**. Claude lo publica y te confirma cuando esté.
   (También: *Terminal → Ejecutar tarea → «Publicar en lvirens.com»*.)

---

## 5. Si algo sale mal

- **No te gusta el cambio:** «deshaz el último cambio» o «vuelve a como
  estaba esta mañana».
- **Algo se ve roto en pruebas:** captura → «esto se ve así, arréglalo».
  Mientras no publiques, lvirens.com no se entera.
- **Ya publicaste y está mal:** «vuelve lvirens.com a la versión anterior
  y publica».
- **VS Code muestra textos raros en rojo en la terminal:** cópialos y pégaselos
  a Claude tal cual. Casi siempre es un paso que falta y él te lo dice.
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
> enséñamelo en localhost y luego deshazlo.

Con eso ya has hecho el ciclo completo.
