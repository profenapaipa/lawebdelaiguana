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

**Doble clic en `Iniciar sitio.bat`** (en la carpeta principal). Enciende un
servidor local y abre el navegador en `http://localhost:8080`. No hay que abrir
`index.html` a mano ni instalar nada: solo usa PowerShell, que ya trae Windows.
Se cierra con Ctrl+C o cerrando la ventana negra.

¿Por qué hace falta? El contenido se carga desde `.json` con `fetch()`, y el
navegador lo bloquea si se abre un archivo con doble clic (`file://`).
(Live Server de VS Code sigue sirviendo, si prefieren.)

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
Iniciar sitio.bat        doble clic: enciende el sitio local
herramientas/servidor.ps1   el servidor que usa el .bat
Logos finales 2026/      logos oficiales (originales, no se editan)
Mascotas/                mascotas oficiales dibujadas a mano (originales)
Manual de Marca.pdf

docs/                    EL SITIO (lo único que se publica)
├── index.html, videos.html, podcasts.html, documentos.html,
│   foro.html, nosotros.html, 404.html
├── assets/
│   ├── css/
│   │   ├── marca.css        colores y tipografías del manual (único lugar)
│   │   ├── base.css         estructura: encabezado, navegación, pie, portada
│   │   └── componentes.css  tarjetas, reproductores, acordeones, modal
│   ├── js/
│   │   ├── plantilla.js     encabezado, navegación, buscador y pie (una vez)
│   │   ├── contenido.js     convierte datos/*.json en tarjetas
│   │   ├── carrusel-portada.js  la tarjeta movible de la portada
│   │   ├── perfil.js        elegir personaje en el perfil
│   │   └── subidas.js       probar un archivo antes de publicarlo
│   └── img/
│       ├── marca/           logos oficiales ya recortados con fondo transparente
│       ├── personajes/      buho, gato, castor (oficiales) e iguana (del logo)
│       └── favicon*.png, apple-touch-icon.png   la taza oficial
└── datos/                   aquí se publica el contenido
```

**Ideas que sostienen todo esto:**

1. **Una sola navegación.** Barra superior en computador, barra inferior en
   celular (es el mismo `<nav>`; lo decide `base.css`). La página tiene un solo
   desplazamiento: no hay carruseles laterales ni cajas con barra propia.
2. **Marca en un solo archivo.** `marca.css` define los colores del manual; las
   demás hojas usan variables, nunca un color suelto. Las tipografías son Anton
   (principal) y Boston Angel (secundaria). Boston Angel no está en Google
   Fonts: si no está instalada se usa Playfair Display. Para que la vean todos,
   subir el archivo a `assets/fonts/` y agregar un `src: url(...)` en `marca.css`.
3. **El encabezado y el pie se escriben una vez** (`plantilla.js`). Sección
   nueva = copiar un `.html` y sumarla a `SECCIONES`.
4. **El contenido vive en `datos/`, no en el HTML.** Una lista se pone con
   `<div class="cuadricula" data-lista="videos" data-limite="3">`.
5. **Logos y mascotas oficiales no se retocan.** Las versiones de `docs/assets/img`
   son los mismos dibujos con el fondo blanco quitado; los originales siguen
   intactos en sus carpetas.

---

## Qué funciona hoy y qué no

| | |
|---|---|
| ✅ | Portada con mascotas oficiales, navegación única (arriba en PC, abajo en celular), buscador |
| ✅ | 7 videos reales desde YouTube, con reproducción al hacer clic |
| ✅ | El buscador filtra videos, podcasts y documentos a la vez, sin importar tildes |
| ✅ | Menú de usuario con mini-insignias: abre, cierra afuera y con Escape |
| ✅ | Elegir personaje (gato, búho, castor, iguana) desde "Editar perfil"; se recuerda en ese navegador |
| ✅ | Favicon (la taza oficial) y mascotas oficiales en la portada |
| ⏳ | Podcasts: las tarjetas existen, falta el enlace de Spotify |
| ⏳ | Docs: falta definir si son PDF, blog o enlaces |
| ❌ | Foro: necesita base de datos y login → fase 2 |
| ❌ | Subir archivos: hoy solo se previsualizan, no se guardan → fase 2 |
| ❌ | Insignias: diseñadas y visibles, pero bloqueadas — necesitan cuenta real → fase 2 |

Lo que no funciona está dicho en el propio sitio, no escondido.

---

## Publicar en internet

En GitHub: **Settings → Pages → Source: Deploy from a branch →
`main` / carpeta `/docs`**.

⚠️ **Con cuenta gratuita, GitHub Pages solo funciona en repositorios públicos.**
Este repositorio es privado, así que primero hay que resolver eso: la vía
recomendada es **GitHub Education** (`education.github.com/teachers`), que le da
GitHub Pro sin costo a los docentes verificados.
