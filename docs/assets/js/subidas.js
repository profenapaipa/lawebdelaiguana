/* ===========================================================
   subidas.js — probar un archivo antes de publicarlo
   ===========================================================
   Escrito por el equipo el 10 de septiembre y afinado el 17.
   Misma lógica, adaptada a la nueva estructura.

   QUÉ HACE Y QUÉ NO:
   Lee el archivo que elijas y lo muestra en pantalla. Nada de esto
   se guarda: URL.createObjectURL() crea una dirección temporal que
   vive solo en este navegador y muere al recargar la página.
   Sirve para ver cómo se vería, no para publicar.
   =========================================================== */

/* Cada formulario de prueba (video, podcast, documento) hace lo mismo:
   mostrar el nombre del archivo, pedir título y crear una tarjeta en
   la lista de pruebas. Solo cambia la tarjeta. */
function activarPrueba({ tipo, sinTitulo, avisoSinArchivo, crearTarjeta, leerComoTexto }) {
  const formulario = document.getElementById(`form-${tipo}`);
  if (!formulario) return;

  const entrada = document.getElementById(`archivo-${tipo}`);
  const nombre = document.getElementById(`nombre-archivo-${tipo}`);
  const pruebas = document.getElementById(`pruebas-${tipo}`);

  entrada.addEventListener("change", () => {
    nombre.textContent = entrada.files[0] ? entrada.files[0].name : "Ningún archivo elegido";
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const archivo = entrada.files[0];
    if (!archivo) return alert(avisoSinArchivo);

    const titulo = document.getElementById(`titulo-${tipo}`).value.trim() || sinTitulo;

    const agregar = (contenido) => {
      const tarjeta = crearTarjeta(archivo, contenido);
      tarjeta.dataset.buscable = window.normalizar(titulo);
      // textContent y no innerHTML: si el título trae <script>, se ve como texto.
      tarjeta.querySelector("h3, summary .titulo-doc").textContent = titulo;
      pruebas.prepend(tarjeta);
    };

    if (leerComoTexto) {
      const lector = new FileReader();
      lector.onload = () => agregar(lector.result);
      lector.readAsText(archivo);
    } else {
      agregar();
    }

    formulario.reset();
    nombre.textContent = "Ningún archivo elegido";
  });
}

function elemento(etiqueta, clase, html) {
  const nodo = document.createElement(etiqueta);
  nodo.className = clase;
  nodo.innerHTML = html;
  return nodo;
}

activarPrueba({
  tipo: "video",
  sinTitulo: "Video sin título",
  avisoSinArchivo: "Elige un archivo .mp4 antes de probarlo.",
  crearTarjeta: (archivo) => {
    const tarjeta = elemento("article", "tarjeta", `
      <video class="miniatura-video" controls src="${URL.createObjectURL(archivo)}"></video>
      <div class="info"><h3></h3><p></p></div>`);
    tarjeta.querySelector("p").textContent = `Solo en este computador · ${archivo.name}`;
    return tarjeta;
  },
});

activarPrueba({
  tipo: "podcast",
  sinTitulo: "Episodio sin título",
  avisoSinArchivo: "Elige un archivo .mp3 antes de probarlo.",
  crearTarjeta: (archivo) => {
    const tarjeta = elemento("article", "tarjeta tarjeta-audio", `
      <div class="info"><h3></h3><p></p></div>
      <audio controls style="width:calc(100% - 2.2rem);margin:0 1.1rem 1.1rem"
             src="${URL.createObjectURL(archivo)}"></audio>`);
    tarjeta.querySelector("p").textContent = `Solo en este computador · ${archivo.name}`;
    return tarjeta;
  },
});

activarPrueba({
  tipo: "documento",
  sinTitulo: "Documento sin título",
  avisoSinArchivo: "Elige un archivo de texto antes de probarlo.",
  leerComoTexto: true,
  crearTarjeta: (archivo, texto) => {
    const item = elemento("details", "acordeon", `
      <summary><span class="titulo-doc"></span></summary>
      <div class="detalle"><p></p></div>`);
    item.querySelector(".detalle p").textContent = texto;
    return item;
  },
});
