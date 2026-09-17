# Bitácora — La web de la iguana

Registro vivo del proyecto: qué avanzó, qué falta, qué decidimos y qué cambió.
Se actualiza **al final de cada sesión**, no al final del semestre.

|  |  |
|---|---|
| Equipo | 1 — Gabriel Giraldo, Samuel Gómez |
| Proyecto | La web de la iguana |
| Repositorio | `profenapaipa/lawebdelaiguana` (privado, 3 colaboradores) |
| URL prevista | `https://profenapaipa.github.io/lawebdelaiguana/` |
| Diseño de referencia | `investigacion/04_Desarrollo/2026-08-12_bocetos.jpg` |
| Última actualización | 2026-09-17 |

> **Regla del boceto:** cualquier cosa que se construya debe poder señalarse en la foto
> del boceto. Si no está ahí, primero se dibuja y se anota como modificación (sección 6).

---

## Cómo se llena

Al terminar cada sesión, cinco minutos:

1. Una línea en **§3 Avances** con la fecha y qué quedó funcionando.
2. Marcar en **§4 Pendientes** lo que se cerró y agregar lo nuevo.
3. Si algo no salió, va a **§5 Bloqueos**, empezando con *"no logramos…"*.
4. Si se eligió entre dos caminos, va a **§2 Decisiones** — esa sección se copia
   tal cual en el punto **3.5 del Artículo base**.
5. Actualizar la fecha de arriba.

Semáforo: 🟢 funciona · 🟡 a medias · 🔴 no empezado · ⏸ aplazado a fase 2

---

## 1. Estado actual

| Parte | Estado | Nota |
|---|---|---|
| Repositorio en GitHub | 🟡 | Falta el commit inicial y conectar con el remoto |
| Publicación en GitHub Pages | 🔴 | **Bloqueado**, ver B-03 |
| Barra superior + buscador | 🟢 | Una sola barra, con el buscador "¿En qué piensas?" |
| Portada "Un café con la iguana" | 🟡 | Funciona; falta la ilustración de la iguana con la taza |
| Sección *New videos* | 🟢 | Carrusel con los 7 videos reales del canal de YouTube |
| Sección *MP3 News* | 🟡 | Reproductor listo; faltan los enlaces de Spotify |
| Sección *DOCS news* | 🟡 | Carrusel listo; falta definir qué son los DOCS |
| Buscador | 🟢 | Filtra las tres secciones a la vez, sin importar tildes |
| Página "El equipo" (icono 👤) | 🟢 | Con números que se cuentan solos desde los datos |
| Foro | ⏸ | Fase 2, ver D-07 |
| Estilos CSS | 🟢 | `estilos.css` del equipo + `boceto.css` |
| Responsive (celular) | 🟡 | Rehecho para la barra nueva, sin probar en dispositivo real |
| Subida de archivos | 🟡 | Previsualiza, no guarda. Avisado en pantalla |

---

## 2. Decisiones técnicas

Cada una es un momento en que había dos caminos. **Esta sección alimenta el punto 3.5
del Artículo base.**

**D-01 · Sitio estático, sin framework** — 2026-09-03
Se descartó React/Vite. Quedan 6 sesiones de 90 minutos, el equipo ya maneja HTML y CSS,
y GitHub Pages sirve archivos estáticos sin necesidad de compilar. Un framework habría
gastado dos sesiones en configuración.

**D-02 · El contenido vive en archivos JSON, no dentro del HTML** — 2026-09-03
Publicar un video nuevo pasa de editar HTML a agregar cuatro líneas en `datos/videos.json`.
Los tres administradores pueden hacerlo desde el navegador, en GitHub, sin instalar nada.

**D-03 · La barra y el pie se escriben una sola vez y se inyectan con JavaScript** — 2026-09-03
Antes estaban copiados en las cinco páginas: un cambio en el menú eran cinco ediciones y
cinco oportunidades de equivocarse.

**D-04 · Los videos se sirven desde YouTube y los podcasts desde Spotify** — 2026-09-03
No se suben archivos de audio ni video al repositorio. El contenido ya existe en esas
plataformas, y GitHub Pages limita a 100 MB por archivo y 1 GB por sitio.

**D-05 · Carátula primero, reproductor después (patrón *lite embed*)** — 2026-09-03
En vez de cargar ocho reproductores incrustados al abrir la página, se muestra la miniatura
con el triángulo ▷ —que es exactamente lo que dibuja el boceto— y el reproductor real se
carga al hacer clic. La página abre rápido incluso en los computadores del colegio.

**D-06 · Sin inicio de sesión: solo los administradores publican** — 2026-09-03
Se descartó el perfil con usuario y contraseña. Los usuarios son menores de edad y guardar
sus datos abre un problema de privacidad que el proyecto no puede resolver este semestre.
*Consecuencia:* el entregable 3 del Formato 1 ("perfil personalizable") se reemplaza en
esta fase por una página **"El equipo"** en el icono 👤 del boceto, y el perfil real se
aplaza a la fase 2.

**D-07 · El foro se aplaza a la fase 2** — 2026-09-03
Requiere base de datos y sesión de usuario, y GitHub Pages no tiene servidor. La página
existe en el menú y dice honestamente que está en construcción. El Artículo base pide
justamente eso: *"escribir lo que no funciona no baja la nota; ocultarlo sí se nota"*.

**D-08 · El sitio se publica desde la carpeta `docs/`, no desde la raíz** — 2026-09-03
Así la carpeta `investigacion/` queda dentro del repositorio pero **fuera del sitio público**.
Importante: aunque el repositorio sea privado, **el sitio publicado es visible para
cualquiera**. Sin esta separación, los PDF de antecedentes y la propuesta con los correos
del equipo quedarían descargables desde internet.

**D-09 · Un solo logo: la iguana** — 2026-09-03
Se elimina `Logo injuv.png` (el colegio pidió no usarlo) y también el archivo
`black-white-iguana-head-logo-...webp`, que es una imagen de banco descargada sin licencia.
Se usa el dibujo SVG de la iguana que ya estaba en el código, hasta que el equipo digitalice
el suyo propio.

**D-10 · La paleta pasa de verde genérico a tonos de iguana real** — 2026-09-10
Decisión del equipo. Se cambió el verde bosque por oliva (`#435429` en sombra,
`#6E8B3D` al sol), el naranja por el tono de la papada (`#E2672E`) y se agregó un
mostaza (`#D9A441`) como acento. Cada color quedó comentado en el CSS diciendo qué
parte de la iguana representa. Es una decisión de diseño con criterio, no un cambio
al azar.

**D-11 · `estilos.css` no se reescribe: se le suma `boceto.css`** — 2026-09-17
Al integrar el trabajo del 10 de septiembre había dos caminos: reescribir el CSS
completo o dejarlo intacto y agregar encima solo lo que faltaba del boceto. Se eligió
lo segundo. Así no se pierde nada de lo que escribió el equipo, y se ve con claridad
qué parte es suya y qué parte se agregó después.

**D-12 · La subida de archivos se queda como previsualización, y se dice** — 2026-09-17
Los tres formularios del 10 de septiembre usan `URL.createObjectURL()`, que crea una
dirección temporal que muere al recargar la página. En vez de quitarlos, se dejaron
funcionando y se les puso un aviso arriba que explica qué hacen y qué no. Sirven para
probar cómo se vería; la subida real es fase 2.

---

## 3. Avances por sesión

### 2026-09-17 — Integración del trabajo del 10 de septiembre
- Se revisó todo lo entregado y se integró al proyecto. El original quedó guardado
  sin tocar en `investigacion/05_Evidencias/2026-09-10_avances/`.
- **Se arreglaron los cuatro bloqueos abiertos** (B-01 a B-04), incluido el que
  impedía que corriera todo el JavaScript del 10 de septiembre.
- Se unificaron las tres navegaciones en **una sola barra superior**, la del boceto,
  con el buscador "¿En qué piensas?".
- Se agregó la portada *Un café con la iguana* y los **tres carruseles** con su
  flecha ›, como en el dibujo.
- Se conectaron los **7 videos reales** del canal de YouTube. Las miniaturas se
  toman solas de YouTube: no hay que dibujarlas.
- El buscador filtra las tres secciones a la vez y no se tropieza con las tildes:
  "conexion" encuentra *Conexión inestable*.
- El menú de perfil por fin abre: el CSS esperaba la clase `.activa` y nadie se la
  ponía.
- Se verificó: las 6 páginas cargan, los 4 archivos JS y los 3 JSON son válidos, y
  las 7 miniaturas de YouTube responden.

### 2026-09-10 — Trabajo del equipo
- Paleta rediseñada con tonos de iguana (ver D-10).
- Página de usuario nueva: perfil, estadísticas e insignias, con su CSS completo.
- Menú desplegable de perfil en el encabezado.
- Primeros formularios de carga para `.mp4`, `.mp3` y `.txt` (133 líneas de JS).
- Se empezó la barra superior del boceto.
- Se arregló la etiqueta `<img>` mal formada y se agregaron textos `alt`.
- *Nota:* nada de ese JavaScript llegó a ejecutarse, porque el HTML lo buscaba en
  `js/script.js` y el archivo estaba en la raíz. El trabajo estaba bien; la ruta no.

### 2026-09-03 — Revisión de arquitectura
- Se revisó todo el código existente contra el boceto del 12 de agosto.
- Se encontraron cuatro fallos que impiden que el sitio funcione (§5, B-01 a B-04).
- Se definió la arquitectura de carpetas y las nueve decisiones técnicas de §2.
- Se creó esta bitácora y el borrador de la ficha técnica.
- **Todavía no se ha escrito código.**

### Próxima sesión — Fase 0: reparar y publicar
Objetivo: que exista una URL viva, aunque el sitio todavía se vea como antes.

---

## 4. Pendientes

| # | Qué falta | Quién | Para cuándo |
|---|---|---|---|
| P-01 | Decidir cómo habilitar Pages en repositorio privado (ver B-03) | Docente | **Bloquea la publicación** |
| P-02 | ~~Pasar la lista de videos de YouTube~~ | Samuel | ✅ 17 sep — 7 videos conectados |
| P-03 | Pasar el enlace del programa en Spotify, o el código de cada episodio | Gabriel | Siguiente sesión |
| P-04 | Definir qué son los "DOCS": ¿PDF propios, entradas de blog, enlaces? | Los dos | Siguiente sesión |
| P-12 | Escribir una descripción real para los 6 cortometrajes: YouTube no las tiene y hoy dicen solo "Cortometraje del semillero" | Los dos | Siguiente sesión |
| P-13 | Confirmar con el docente si se pueden publicar los nombres completos de los estudiantes en un sitio abierto a internet | Docente | Antes de publicar |
| P-05 | Digitalizar la ilustración de la iguana con la taza de café (portada) | Por definir | Fase 2 |
| P-06 | Digitalizar el logo de la iguana de la esquina superior izquierda | Por definir | Fase 2 |
| P-07 | Llenar la ficha técnica en el formato oficial `.docx` | Los dos | Inmediato |
| P-08 | Llenar `Barreras.docx`, columna "Desarrollo web" | Los dos | Al cerrar fase 0 |
| P-09 | Instalar la extensión **Live Server** en VS Code (ver B-05) | Los dos | Antes de la fase 1 |
| P-10 | Subir las fotos de sesión a `05_Evidencias`, que está vacía | Los dos | Cada sesión |
| P-11 | Probar el sitio en un celular real, no solo achicando la ventana | Los dos | Fase 3 |

---

## 5. Bloqueos — "no logramos…"

Se escriben como acción concreta, no como tema. De aquí salen los tutoriales.

| # | No logramos… | ¿Urgente? | Estado |
|---|---|---|---|
| B-01 | …que se aplicaran los estilos y el JavaScript: el HTML los buscaba en `css/` y `js/`, y los archivos estaban sueltos en la raíz | Sí | ✅ Resuelto 17 sep |
| B-02 | …que el botón "Inicio" llevara a alguna parte: los menús enlazan a `index.html` y el archivo se llamaba `La web de la iguana.html` | Sí | ✅ Resuelto 17 sep |
| B-03 | …publicar en GitHub Pages: **con cuenta gratuita, Pages solo funciona en repositorios públicos**, y el nuestro es privado | Sí | 🔴 Abierto |
| B-04 | …que el logo se viera: se referenciaba `Logo_injuv.png` (antes era `Logo injuv.png`) y ninguna de las dos imágenes estaba en la carpeta | Sí | ✅ Resuelto 17 sep |
| B-05 | …abrir la página con doble clic ahora que el contenido se carga desde JSON: el navegador lo bloquea con `file://`, hay que usar Live Server | No | 🟡 Convivimos con esto |
| B-06 | …que se abriera el menú de perfil: el CSS esperaba la clase `.activa` y ningún JavaScript se la ponía | No | ✅ Resuelto 17 sep |
| B-07 | …decidir cuál de las tres barras de navegación mandaba: quedaron conviviendo el desplegable, la barra superior y la barra lateral, y con enlaces distintos en cada página | Sí | ✅ Resuelto 17 sep |

---

## 6. Modificaciones al plan original

| Fecha | Qué cambió | Por qué |
|---|---|---|
| 2026-09-03 | El foro pasa de la fase 1 a la fase 2 | Necesita base de datos y login; Pages no tiene servidor (D-07) |
| 2026-09-03 | El "perfil personalizable" se reemplaza por la página "El equipo" | Sin login, y son menores de edad (D-06) |
| 2026-09-03 | Git y GitHub suben de prioridad **baja** a **alta** | En el Formato 1 quedaron como "según la necesidad", pero sin repositorio no hay despliegue, ni respaldo, ni historial de versiones — y el historial se evalúa |
| 2026-09-03 | Los MP3 y MP4 no se alojan en el repositorio | Ya viven en YouTube y Spotify (D-04) |
| 2026-09-03 | Las fechas del Formato 1 dejan de ser fechas fijas y pasan a ser orden de fases | Decisión del equipo. Además, el Formato 1 asignaba tareas al 7 y 8 de octubre, que caen en el receso escolar del 3 al 12 |
