/* ===========================================================
   subidas.js — probar un archivo antes de publicarlo
   ===========================================================
   Escrito por el equipo el 10 de septiembre. Aquí se mantuvo la
   misma lógica y se adaptó a la maquetación nueva del boceto.

   QUÉ HACE Y QUÉ NO:
   Lee el archivo que elijas y lo muestra en pantalla. Nada de esto
   se guarda: URL.createObjectURL() crea una dirección temporal que
   vive solo en este navegador y muere al recargar la página.
   Sirve para ver cómo se vería, no para publicar.
   La publicación de verdad se hace en los archivos de datos/, y la
   subida desde el navegador es la fase 2 (necesita base de datos).
   =========================================================== */


/* ===== Acordeón (foro y documentos de prueba) ===== */
function activarAcordeon(fila) {
  fila.addEventListener("click", () => {
    fila.parentElement.classList.toggle("abierto");
  });
}

document.querySelectorAll(".fila-titulo").forEach(activarAcordeon);


/* ===== Utilidad: mostrar el nombre del archivo elegido ===== */
function mostrarNombreArchivo(input, etiqueta) {
  input.addEventListener("change", () => {
    etiqueta.textContent = input.files[0] ? input.files[0].name : "Ningún archivo elegido";
  });
}


/* ===== Probar un video (.mp4) ===== */
const formVideo = document.getElementById("form-video");
if (formVideo) {
  const inputVideo = document.getElementById("archivo-video");
  const nombreVideo = document.getElementById("nombre-archivo-video");
  mostrarNombreArchivo(inputVideo, nombreVideo);

  formVideo.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputVideo.files[0];
    if (!archivo) {
      alert("Elige un archivo .mp4 antes de probarlo.");
      return;
    }
    const titulo = document.getElementById("titulo-video").value.trim() || "Video sin título";
    const cuadricula = document.getElementById("cuadricula-videos");

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.dataset.buscable = window.normalizar(titulo);
    tarjeta.innerHTML = `
      <video class="miniatura-video" controls src="${URL.createObjectURL(archivo)}"></video>
      <div class="info">
        <h3></h3>
        <p>Solo en este computador · ${archivo.name}</p>
      </div>`;
    tarjeta.querySelector("h3").textContent = titulo;
    cuadricula.prepend(tarjeta);

    formVideo.reset();
    nombreVideo.textContent = "Ningún archivo elegido";
  });
}


/* ===== Probar un podcast (.mp3) ===== */
const formPodcast = document.getElementById("form-podcast");
if (formPodcast) {
  const inputPodcast = document.getElementById("archivo-podcast");
  const nombrePodcast = document.getElementById("nombre-archivo-podcast");
  mostrarNombreArchivo(inputPodcast, nombrePodcast);

  formPodcast.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputPodcast.files[0];
    if (!archivo) {
      alert("Elige un archivo .mp3 antes de probarlo.");
      return;
    }
    const titulo = document.getElementById("titulo-podcast").value.trim() || "Episodio sin título";
    const lista = document.getElementById("lista-podcasts");

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-audio";
    tarjeta.dataset.buscable = window.normalizar(titulo);
    tarjeta.innerHTML = `
      <h3></h3>
      <p>Solo en este computador · ${archivo.name}</p>
      <audio controls style="width:100%" src="${URL.createObjectURL(archivo)}"></audio>`;
    tarjeta.querySelector("h3").textContent = titulo;
    lista.prepend(tarjeta);

    formPodcast.reset();
    nombrePodcast.textContent = "Ningún archivo elegido";
  });
}


/* ===== Probar un documento de texto (.txt) ===== */
const formDocumento = document.getElementById("form-documento");
if (formDocumento) {
  const inputDocumento = document.getElementById("archivo-documento");
  const nombreDocumento = document.getElementById("nombre-archivo-documento");
  mostrarNombreArchivo(inputDocumento, nombreDocumento);

  formDocumento.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputDocumento.files[0];
    if (!archivo) {
      alert("Elige un archivo de texto antes de probarlo.");
      return;
    }
    const titulo = document.getElementById("titulo-documento").value.trim() || "Documento sin título";

    const lector = new FileReader();
    lector.onload = () => {
      const lista = document.getElementById("lista-documentos");

      const item = document.createElement("li");
      item.className = "episodio";
      item.innerHTML = `
        <div class="fila-titulo">
          <span class="titulo-doc"></span>
          <span class="flecha" aria-hidden="true">▽</span>
        </div>
        <div class="detalle"><p></p></div>`;

      // textContent y no innerHTML: si el .txt trae algo como <script>,
      // se muestra como texto y no se ejecuta.
      item.querySelector(".titulo-doc").textContent = titulo;
      item.querySelector(".detalle p").textContent = lector.result;

      lista.prepend(item);
      activarAcordeon(item.querySelector(".fila-titulo"));
    };
    lector.readAsText(archivo);

    formDocumento.reset();
    nombreDocumento.textContent = "Ningún archivo elegido";
  });
}
