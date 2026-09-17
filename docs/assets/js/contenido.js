/* ===========================================================
   contenido.js — convierte los archivos de datos en tarjetas
   ===========================================================
   Para publicar un video nuevo NO se toca ningún HTML:
   se agregan cuatro líneas en datos/videos.json y ya aparece.

   OJO: esto usa fetch(), y fetch no funciona si abres el
   archivo con doble clic (file://). Hay que abrirlo con
   Live Server en VS Code: clic derecho > "Open with Live Server".
   =========================================================== */

const limpiar = (t) => String(t ?? "").replace(/[<>&"]/g, (c) =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

const buscable = (...partes) => window.normalizar(partes.join(" "));

async function leerDatos(archivo) {
  try {
    const respuesta = await fetch(`datos/${archivo}`);
    if (!respuesta.ok) throw new Error(respuesta.status);
    return await respuesta.json();
  } catch (error) {
    console.error(`No se pudo leer datos/${archivo}:`, error);
    return null;
  }
}

function avisoDeError(contenedor) {
  contenedor.innerHTML = `<p class="vacio">No se pudieron cargar los datos.
    Si abriste el archivo con doble clic, ábrelo con <strong>Live Server</strong>.</p>`;
}


/* ---------- VIDEOS (YouTube) ---------- */

function tarjetaVideo(video) {
  const miniatura = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  return `
    <article class="tarjeta" data-buscable="${buscable(video.titulo, video.descripcion)}">
      <button class="miniatura-yt" data-video="${video.id}"
              aria-label="Reproducir ${limpiar(video.titulo)}">
        <img src="${miniatura}" alt="" loading="lazy">
      </button>
      <div class="info">
        <h3>${limpiar(video.titulo)}</h3>
        <p>${limpiar(video.descripcion)}</p>
      </div>
    </article>`;
}

/* El video real se carga solo al hacer clic: así la página abre rápido
   aunque haya diez videos, y la miniatura con el ▷ es la del boceto. */
function activarReproduccion(contenedor) {
  contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".miniatura-yt");
    if (!boton) return;

    const marco = document.createElement("iframe");
    marco.src = `https://www.youtube-nocookie.com/embed/${boton.dataset.video}?autoplay=1&rel=0`;
    marco.title = boton.getAttribute("aria-label");
    marco.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
    marco.allowFullscreen = true;
    boton.replaceWith(marco);
  });
}

async function pintarVideos(idContenedor, limite) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const videos = await leerDatos("videos.json");
  if (!videos) return avisoDeError(contenedor);

  const lista = limite ? videos.slice(0, limite) : videos;
  contenedor.innerHTML = lista.length
    ? lista.map(tarjetaVideo).join("")
    : `<p class="vacio">Todavía no hay videos publicados.</p>`;

  activarReproduccion(contenedor);
}


/* ---------- PODCASTS (Spotify) ---------- */

function ondaDeSonido() {
  // Las rayitas del boceto. Alturas variadas para que parezca sonido.
  const alturas = [40, 70, 95, 55, 80, 35, 100, 60, 45, 85, 30, 75, 50, 90,
                   65, 38, 82, 58, 96, 42, 70, 88, 33, 62, 78, 48, 92, 55];
  return alturas.map((h) => `<span style="height:${h}%"></span>`).join("");
}

function tarjetaPodcast(ep) {
  const pendiente = !ep.spotify;
  return `
    <article class="tarjeta-audio ${pendiente ? "pendiente" : ""}"
             data-buscable="${buscable(ep.titulo, ep.descripcion)}">
      <h3>${limpiar(ep.titulo)} ${pendiente ? '<span class="etiqueta-pendiente">por publicar</span>' : ""}</h3>
      <p>${limpiar(ep.descripcion)}</p>
      ${pendiente
        ? `<div class="barra-audio"><span class="play" aria-hidden="true">▷</span>
             <span class="onda" aria-hidden="true">${ondaDeSonido()}</span></div>`
        : `<button class="barra-audio" data-spotify="${limpiar(ep.spotify)}"
                   aria-label="Escuchar ${limpiar(ep.titulo)}">
             <span class="play" aria-hidden="true">▷</span>
             <span class="onda" aria-hidden="true">${ondaDeSonido()}</span>
           </button>`}
    </article>`;
}

function activarEscucha(contenedor) {
  contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".barra-audio[data-spotify]");
    if (!boton) return;

    const marco = document.createElement("iframe");
    marco.src = `https://open.spotify.com/embed/episode/${boton.dataset.spotify}`;
    marco.title = boton.getAttribute("aria-label");
    marco.height = "152";
    marco.style.border = "0";
    marco.style.width = "100%";
    marco.allow = "clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    boton.replaceWith(marco);
  });
}

async function pintarPodcasts(idContenedor, limite) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const episodios = await leerDatos("podcasts.json");
  if (!episodios) return avisoDeError(contenedor);

  const lista = limite ? episodios.slice(0, limite) : episodios;
  contenedor.innerHTML = lista.length
    ? lista.map(tarjetaPodcast).join("")
    : `<p class="vacio">Todavía no hay episodios publicados.</p>`;

  activarEscucha(contenedor);
}


/* ---------- DOCUMENTOS ---------- */

function tarjetaDocumento(doc) {
  const lineas = "<i></i>".repeat(7);
  const cuerpo = `
    <div class="lineas" aria-hidden="true">${lineas}</div>
    <div class="info">
      <h3>${limpiar(doc.titulo)}</h3>
      <p>${limpiar(doc.descripcion)}</p>
    </div>`;

  return doc.enlace
    ? `<a class="tarjeta tarjeta-doc" href="${limpiar(doc.enlace)}" target="_blank" rel="noopener"
          data-buscable="${buscable(doc.titulo, doc.descripcion)}">${cuerpo}</a>`
    : `<article class="tarjeta tarjeta-doc"
          data-buscable="${buscable(doc.titulo, doc.descripcion)}">${cuerpo}</article>`;
}

async function pintarDocumentos(idContenedor, limite) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const documentos = await leerDatos("documentos.json");
  if (!documentos) return avisoDeError(contenedor);

  const lista = limite ? documentos.slice(0, limite) : documentos;
  contenedor.innerHTML = lista.length
    ? lista.map(tarjetaDocumento).join("")
    : `<p class="vacio">Todavía no hay documentos publicados.</p>`;
}


/* ---------- CUÁNTAS COSAS HAY (página del equipo) ----------
   Se cuentan solas desde los archivos de datos, para que el número
   no quede desactualizado cuando se publique algo nuevo. */

async function pintarEstadisticas() {
  const casilla = document.getElementById("dato-videos");
  if (!casilla) return;

  const [videos, podcasts, documentos] = await Promise.all([
    leerDatos("videos.json"),
    leerDatos("podcasts.json"),
    leerDatos("documentos.json"),
  ]);

  const escribir = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor ?? "—";
  };

  escribir("dato-videos", videos?.length);
  escribir("dato-podcasts", podcasts?.length);
  escribir("dato-documentos", documentos?.length);
}


/* ---------- Se pinta lo que cada página pida ---------- */

pintarVideos("pista-videos", 6);
pintarVideos("cuadricula-videos");
pintarPodcasts("pista-podcasts", 6);
pintarPodcasts("lista-podcasts");
pintarDocumentos("pista-documentos", 6);
pintarDocumentos("cuadricula-documentos");
pintarEstadisticas();
