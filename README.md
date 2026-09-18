# La web de la iguana

Canal propio del Colegio INJUV para divulgar lo que hacen los estudiantes:
videos, podcasts y documentos, en un solo lugar.

Proyecto del **Equipo 1** del Semillero de Tecnología Maker, 2026-II.
Gabriel Giraldo y Samuel Gómez.

- **Sitio:** https://profenapaipa.github.io/lawebdelaiguana/
- **Diseño de referencia:** `investigacion/04_Desarrollo/2026-08-12_bocetos.jpg`
- **Estado del proyecto:** [BITACORA.md](BITACORA.md)

---

## Qué hay en cada carpeta

| Carpeta | Qué contiene | ¿Se publica? |
|---|---|---|
| `docs/` | **El sitio web.** | ✅ Sí |
| `investigacion/` | El artículo, los formatos, los antecedentes, las evidencias | ❌ No |

> `docs/` tiene ese nombre porque **GitHub lo exige** para publicar desde una
> subcarpeta. No tiene nada que ver con la sección "DOCS news" del sitio, que vive
> en `docs/documentos.html`.

Que `investigacion/` quede fuera de `docs/` no es un detalle: **aunque el
repositorio sea privado, el sitio publicado es público.** Si la investigación
estuviera dentro de `docs/`, los PDF de antecedentes y la propuesta con los correos
del equipo quedarían descargables desde internet.

---

## Cómo abrir el sitio para trabajar

El contenido se carga desde archivos `.json` con `fetch()`, y **`fetch` no funciona
abriendo el archivo con doble clic** (el navegador lo bloquea con `file://`).

1. Abrir la carpeta del proyecto en **Visual Studio Code**.
2. Instalar la extensión **Live Server** (de Ritwick Dey), una sola vez.
3. Clic derecho sobre `docs/index.html` → **Open with Live Server**.

Si abren con doble clic, van a ver la página sin ninguna tarjeta y un aviso.

---

## Cómo publicar contenido nuevo

**No se toca ningún archivo HTML.** Se edita el `.json` que corresponda:

### Un video nuevo → `docs/datos/videos.json`

```json
{
  "id": "hAOnfibCEmM",
  "titulo": "Manos que hablan",
  "descripcion": "De qué se trata, en una o dos frases.",
  "fecha": "2026-05-01"
}
```

El `id` son los 11 caracteres que van después de `watch?v=` en el enlace de YouTube:

```
https://www.youtube.com/watch?v=hAOnfibCEmM
                                ^^^^^^^^^^^
```

La miniatura no hay que subirla: se toma sola desde YouTube.

### Un episodio nuevo → `docs/datos/podcasts.json`

```json
{
  "titulo": "MP3 News",
  "descripcion": "De qué se trata.",
  "spotify": "4rOoJ6Egrf8K2IrywzwOMk"
}
```

Mientras `spotify` sea `null`, la tarjeta sale marcada como *por publicar* y el
botón queda apagado. Al poner el código del episodio, el reproductor se activa solo.

### Un documento nuevo → `docs/datos/documentos.json`

```json
{
  "titulo": "Reglamento del sitio",
  "descripcion": "De qué se trata.",
  "enlace": "https://..."
}
```

Con `enlace` en `null`, la tarjeta se muestra pero no lleva a ninguna parte.

---

## Cómo está armado el sitio

```
docs/
├── index.html          portada: las tres secciones del boceto
├── videos.html         todos los videos
├── podcasts.html       todos los episodios
├── documentos.html     docs y noticias
├── foro.html           en construcción (fase 2)
├── 404.html            página no encontrada
├── .nojekyll           le dice a GitHub que no procese nada
│
├── assets/
│   ├── css/
│   │   ├── estilos.css   la hoja del equipo: paleta, encabezado,
│   │   │                 menú de usuario, tarjetas, zona de carga
│   │   └── boceto.css    lo que agrega el dibujo del 12 de agosto:
│   │                     buscador, portada, carruseles, reproductores
│   ├── js/
│   │   ├── plantilla.js  el encabezado, las barras y el pie, en un solo lugar
│   │   ├── contenido.js  convierte los .json en tarjetas
│   │   ├── carrusel.js   la flecha › de cada fila
│   │   └── subidas.js    probar un archivo antes de publicarlo
│   └── img/
│
└── datos/              aquí se publica el contenido
```

**Dos ideas sostienen todo esto:**

1. **El encabezado se escribe una sola vez** (`plantilla.js`) y se inyecta en las 5
   páginas. Antes estaba copiado 5 veces: cambiar un enlace eran 5 ediciones.
2. **El contenido vive en `datos/`, no en el HTML.** Publicar deja de ser programar.

Cada página dice quién es con `<body data-pagina="videos">`, y así la barra marca
sola la pestaña activa.

---

## Qué funciona hoy y qué no

| | |
|---|---|
| ✅ | Portada, barra superior, buscador, carruseles |
| ✅ | 7 videos reales desde YouTube, con reproducción al hacer clic |
| ✅ | El buscador filtra videos, podcasts y documentos a la vez, sin importar tildes |
| ✅ | Menú de usuario con mini-insignias: abre, cierra afuera y con Escape |
| ⏳ | Podcasts: las tarjetas existen, falta el enlace de Spotify |
| ⏳ | Docs: falta definir si son PDF, blog o enlaces |
| ❌ | Foro: necesita base de datos y login → fase 2 |
| ❌ | Subir archivos: hoy solo se previsualizan, no se guardan → fase 2 |
| ❌ | Menú de usuario e insignias: diseñados y abriendo, pero sin datos reales → fase 2 |

Lo que no funciona está dicho en el propio sitio, no escondido.

---

## Publicar en internet

En GitHub: **Settings → Pages → Source: Deploy from a branch →
`main` / carpeta `/docs`**.

⚠️ **Con cuenta gratuita, GitHub Pages solo funciona en repositorios públicos.**
Este repositorio es privado, así que primero hay que resolver eso: la vía
recomendada es **GitHub Education** (`education.github.com/teachers`), que le da
GitHub Pro sin costo a los docentes verificados.
