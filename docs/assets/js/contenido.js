/* ===========================================================
   contenido.js — convierte los archivos de datos en tarjetas
   ===========================================================
   Para publicar un cortometraje nuevo NO se toca ningún HTML:
   se agregan cuatro líneas en datos/cortometrajes.json y ya aparece.

   Cada página dice qué quiere con un atributo:
       <div class="cuadricula" data-lista="cortometrajes" data-limite="3"></div>
   - data-lista   cortometrajes | podcasts | documentos
   - data-limite  (opcional) cuántas tarjetas muestra la portada.
                  Las demás quedan escondidas y aparecen al buscar.

   Para un tipo de contenido nuevo: agregar su entrada en LISTAS.

   OJO: esto usa fetch(), y fetch no funciona si se abre el archivo
   con doble clic (file://). Se abre con  "Iniciar sitio.bat"
   (o con Live Server en VS Code).
   =========================================================== */

const limpiar = (t) => String(t ?? "").replace(/[<>&"]/g, (c) =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

/* En los .json, lo que va entre **dos asteriscos** sale en negrilla. */
const conNegrita = (t) => limpiar(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

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


/* ---------- CORTOMETRAJES (YouTube) ---------- */

function tarjetaVideo(video) {
  return `
    <article class="tarjeta" data-buscable="${buscable(video.titulo, video.descripcion.replaceAll('**', ''))}">
      <button class="miniatura-yt" type="button" data-video="${limpiar(video.id)}"
              aria-label="Reproducir ${limpiar(video.titulo)}">
        <img src="https://img.youtube.com/vi/${limpiar(video.id)}/hqdefault.jpg" alt="" loading="lazy">
        <span class="play" aria-hidden="true"></span>
      </button>
      <div class="info">
        <h3>${limpiar(video.titulo)}</h3>
        ${video.premio ? `<span class="etiqueta premio">★ ${limpiar(video.premio)}</span>` : ""}
        <p>${conNegrita(video.descripcion)}</p>
      </div>
    </article>`;
}

/* El cortometraje real se carga solo al tocar la miniatura: así la página abre
   rápido aunque haya muchos cortometrajes. */
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


/* ---------- PODCASTS (Spotify) ---------- */

function ondaDeSonido() {
  // Las rayitas del boceto. Alturas variadas para que parezca sonido.
  const alturas = [40, 70, 95, 55, 80, 35, 100, 60, 45, 85, 30, 75, 50, 90,
                   65, 38, 82, 58, 96, 42, 70, 88, 33, 62, 78, 48, 92, 55];
  return alturas.map((h) => `<span style="height:${h}%"></span>`).join("");
}

function tarjetaPodcast(ep) {
  const pendiente = !ep.spotify;
  const reproductor = pendiente
    ? `<div class="barra-audio"><span class="play" aria-hidden="true">▶</span>
         <span class="onda" aria-hidden="true">${ondaDeSonido()}</span></div>`
    // La vista previa de Spotify se muestra de una vez, sin pedir clic.
    : `<iframe src="https://open.spotify.com/embed/episode/${limpiar(ep.spotify)}" height="152"
               title="Escuchar ${limpiar(ep.titulo)} en Spotify" loading="lazy"
               allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  return `
    <article class="tarjeta tarjeta-audio ${pendiente ? "pendiente" : ""}"
             data-buscable="${buscable(ep.titulo, ep.descripcion)}">
      <div class="info">
        ${pendiente ? '<span class="etiqueta">Próximamente</span>' : ""}
        <h3>${limpiar(ep.titulo)}</h3>
        <p>${limpiar(ep.descripcion)}</p>
      </div>
      ${reproductor}
    </article>`;
}


/* ---------- DOCUMENTOS ---------- */

function tarjetaDocumento(doc) {
  const cuerpo = `
    <div class="lineas" aria-hidden="true">${"<i></i>".repeat(6)}</div>
    <div class="info">
      ${doc.enlace ? "" : '<span class="etiqueta">Próximamente</span>'}
      <h3>${limpiar(doc.titulo)}</h3>
      <p>${limpiar(doc.descripcion)}</p>
    </div>`;

  return doc.enlace
    ? `<a class="tarjeta tarjeta-doc" href="${limpiar(doc.enlace)}" target="_blank" rel="noopener"
          data-buscable="${buscable(doc.titulo, doc.descripcion)}">${cuerpo}</a>`
    : `<article class="tarjeta tarjeta-doc"
          data-buscable="${buscable(doc.titulo, doc.descripcion)}">${cuerpo}</article>`;
}


/* ---------- Un tipo de contenido = un archivo + una tarjeta ---------- */

const LISTAS = {
  cortometrajes: {
    archivo: "cortometrajes.json",
    tarjeta: tarjetaVideo,
    activar: activarReproduccion,
    vacio: "Próximamente: nuevos cortometrajes.",
  },
  podcasts: {
    archivo: "podcasts.json",
    tarjeta: tarjetaPodcast,
    vacio: "Próximamente: nuevos episodios.",
  },
  documentos: {
    archivo: "documentos.json",
    tarjeta: tarjetaDocumento,
    vacio: "Próximamente: nuevos documentos.",
  },
};

async function pintarLista(contenedor) {
  const tipo = LISTAS[contenedor.dataset.lista];
  if (!tipo) return;

  const limite = Number(contenedor.dataset.limite) || Infinity;
  const datos = await leerDatos(tipo.archivo);

  if (!datos) {
    contenedor.innerHTML = `<p class="vacio">No pudimos cargar este contenido. Recarga la página o vuelve a intentarlo en un rato.</p>`;
    return;
  }

  const lista = datos; // el orden es el del archivo: lo destacado va primero

  contenedor.innerHTML = lista.length
    ? lista.map(tipo.tarjeta).join("")
    : `<p class="vacio">${tipo.vacio}</p>`;

  // Lo que pasa del límite se esconde, salvo que alguien lo busque (ver componentes.css).
  [...contenedor.children].slice(limite).forEach((tarjeta) => tarjeta.classList.add("extra"));

  tipo.activar?.(contenedor);
}

Promise.all([...document.querySelectorAll("[data-lista]")].map(pintarLista))
  .then(() => window.aplicarBusqueda());
