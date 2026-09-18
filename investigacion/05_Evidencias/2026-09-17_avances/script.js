
// ===== Acordeón (episodios, podcasts, documentos) =====
function activarAcordeon(fila) {
  fila.addEventListener("click", () => {
    fila.parentElement.classList.toggle("abierto");
  });
}

document.querySelectorAll(".fila-titulo").forEach(activarAcordeon);


// ===== Menú de usuario (tarjeta desplegable arriba a la derecha) =====
const botonUsuario = document.getElementById("boton-usuario");
const tarjetaUsuario = document.getElementById("tarjeta-usuario");

if (botonUsuario && tarjetaUsuario) {
  botonUsuario.addEventListener("click", (evento) => {
    evento.stopPropagation();
    const estabaAbierta = !tarjetaUsuario.hidden;
    tarjetaUsuario.hidden = estabaAbierta;
    botonUsuario.setAttribute("aria-expanded", String(!estabaAbierta));
  });

  document.addEventListener("click", (evento) => {
    if (!tarjetaUsuario.hidden && !tarjetaUsuario.contains(evento.target)) {
      tarjetaUsuario.hidden = true;
      botonUsuario.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      tarjetaUsuario.hidden = true;
      botonUsuario.setAttribute("aria-expanded", "false");
    }
  });
}


// ===== Utilidad: mostrar el nombre del archivo elegido =====
function mostrarNombreArchivo(input, etiqueta) {
  input.addEventListener("change", () => {
    etiqueta.textContent = input.files[0] ? input.files[0].name : "Ningún archivo elegido";
  });
}


// ===== Subir video (.mp4) =====
const formVideo = document.getElementById("form-video");
if (formVideo) {
  const inputVideo = document.getElementById("archivo-video");
  const nombreVideo = document.getElementById("nombre-archivo-video");
  mostrarNombreArchivo(inputVideo, nombreVideo);

  formVideo.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputVideo.files[0];
    if (!archivo) {
      alert("Elige un archivo .mp4 antes de subirlo.");
      return;
    }
    const titulo = document.getElementById("titulo-video").value.trim() || "Video sin título";
    const url = URL.createObjectURL(archivo);
    const cuadricula = document.getElementById("cuadricula-videos");

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <video class="miniatura-video" controls src="${url}"></video>
      <div class="info">
        <h3>${titulo}</h3>
        <p>Subido por ti · ${archivo.name}</p>
      </div>
    `;
    cuadricula.prepend(tarjeta);

    formVideo.reset();
    nombreVideo.textContent = "Ningún archivo elegido";
  });
}


// ===== Subir podcast (.mp3) =====
const formPodcast = document.getElementById("form-podcast");
if (formPodcast) {
  const inputPodcast = document.getElementById("archivo-podcast");
  const nombrePodcast = document.getElementById("nombre-archivo-podcast");
  mostrarNombreArchivo(inputPodcast, nombrePodcast);

  formPodcast.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputPodcast.files[0];
    if (!archivo) {
      alert("Elige un archivo .mp3 antes de subirlo.");
      return;
    }
    const titulo = document.getElementById("titulo-podcast").value.trim() || "Episodio sin título";
    const url = URL.createObjectURL(archivo);
    const lista = document.getElementById("lista-podcasts");

    const item = document.createElement("li");
    item.className = "episodio";
    item.innerHTML = `
      <div class="fila-titulo">
        ${titulo}
        <span class="flecha">▽</span>
      </div>
      <div class="detalle">
        <p>Subido por ti · ${archivo.name}</p>
        <audio controls src="${url}"></audio>
      </div>
    `;
    lista.prepend(item);
    activarAcordeon(item.querySelector(".fila-titulo"));

    formPodcast.reset();
    nombrePodcast.textContent = "Ningún archivo elegido";
  });
}


// ===== Subir documento de texto (.txt) =====
const formDocumento = document.getElementById("form-documento");
if (formDocumento) {
  const inputDocumento = document.getElementById("archivo-documento");
  const nombreDocumento = document.getElementById("nombre-archivo-documento");
  mostrarNombreArchivo(inputDocumento, nombreDocumento);

  formDocumento.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = inputDocumento.files[0];
    if (!archivo) {
      alert("Elige un archivo de texto antes de subirlo.");
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
          ${titulo}
          <span class="flecha">▽</span>
        </div>
        <div class="detalle">
          <p>${lector.result}</p>
        </div>
      `;
      lista.prepend(item);
      activarAcordeon(item.querySelector(".fila-titulo"));
    };
    lector.readAsText(archivo);

    formDocumento.reset();
    nombreDocumento.textContent = "Ningún archivo elegido";
  });
}
