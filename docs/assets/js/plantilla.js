/* ===========================================================
   plantilla.js — el encabezado, la navegación y el pie, en un solo lugar
   ===========================================================
   Se escribe una vez aquí y se inyecta en todas las páginas.
   Cambiar un enlace del menú es UNA edición, no seis.

   Cada página dice quién es con  <body data-pagina="cortometrajes">
   y así la navegación marca sola la pestaña activa.

   Para agregar una sección nueva al sitio:
     1. crear su .html (copiar uno existente),
     2. agregarla a SECCIONES aquí abajo.
   No hay que tocar nada más.

   La navegación es un solo <nav>: arriba en computador,
   abajo en celular. Eso lo decide base.css, no este archivo.
   =========================================================== */

const ICONOS = {
  inicio:     '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cortometrajes: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
  podcasts:   '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  documentos: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  foro:       '<path d="M4 5h16v11H9l-5 4z"/>',
  lupa:       '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  youtube:    '<path fill="currentColor" stroke="none" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  instagram:  '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
  spotify:    '<circle cx="12" cy="12" r="10"/><path d="M7 9.3c3.6-1 7.2-.7 10.2 1.1M7.6 12.5c3-.8 6-.5 8.5 1M8.2 15.5c2.5-.6 5-.3 7 .8"/>',
};

const icono = (nombre) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre]}</svg>`;

const SECCIONES = [
  { id: "inicio",     href: "index.html",      texto: "Inicio" },
  { id: "cortometrajes", href: "cortometrajes.html", texto: "Cortometrajes" },
  { id: "podcasts",   href: "podcasts.html",   texto: "Pódcast" },
  { id: "documentos", href: "documentos.html", texto: "Blog" },
  { id: "foro",       href: "foro.html",       texto: "Foro" },
];

/* ---------- Redes del canal ----------
   Un solo lugar para los enlaces: el pie y "Quiénes somos" se llenan desde aquí.
   Cualquier elemento con  data-redes  recibe la lista. */
const REDES = [
  { id: "youtube",   texto: "@Uncaféconlaiguana", nombre: "YouTube",
    href: "https://www.youtube.com/@Uncaf%C3%A9conlaiguana" },
  { id: "instagram", texto: "@uncafeconlaiguana", nombre: "Instagram",
    href: "https://www.instagram.com/uncafeconlaiguana/" },
  { id: "spotify",   texto: "Pódcast Un café con la iguana - Spotify", nombre: "Spotify",
    href: "https://open.spotify.com/show/7bgpRR6qFIcA556c7X7OPI" },
];

function llenarRedes() {
  document.querySelectorAll("a[data-icono]").forEach((a) => a.insertAdjacentHTML("afterbegin", icono(a.dataset.icono)));

  document.querySelectorAll("[data-redes]").forEach((contenedor) => {
    // data-redes="iconos": solo el ícono (para la portada); si no, ícono + @
    const soloIconos = contenedor.dataset.redes === "iconos";
    contenedor.classList.add("redes");
    contenedor.classList.toggle("redes-iconos", soloIconos);
    contenedor.innerHTML = REDES.map((r) => `
      <a class="red-enlace" href="${r.href}" target="_blank" rel="noopener"
         aria-label="${r.nombre}: ${r.texto}" ${soloIconos ? `title="${r.nombre}"` : ""}>
        ${icono(r.id)}<span ${soloIconos ? 'class="solo-lectores"' : ""}>${r.texto}</span>
      </a>`).join("");
  });
}

const paginaActual = document.body.dataset.pagina || "";


/* ---------- Encabezado: marca · navegación · buscador · usuario ---------- */
function construirEncabezado() {
  const enlaces = SECCIONES.map((s) => `
      <a href="${s.href}" ${s.id === paginaActual ? 'class="activo" aria-current="page"' : ""}>
        ${icono(s.id)}<span>${s.texto}</span>
      </a>`).join("");

  const encabezado = document.createElement("header");
  encabezado.className = "encabezado";
  encabezado.innerHTML = `
    <div class="contenedor encabezado-interior">
      <a class="encabezado-marca" href="index.html" aria-label="Un café con la iguana — inicio">
        <img src="assets/img/marca/logo-color.png" alt="Un café con la iguana">
      </a>

      <nav class="nav-principal" aria-label="Secciones del sitio">${enlaces}
      </nav>

      <form class="buscador" role="search">
        ${icono("lupa")}
        <label class="solo-lectores" for="campo-busqueda">Buscar en el sitio</label>
        <input type="search" id="campo-busqueda" placeholder="¿En qué piensas?" autocomplete="off">
      </form>

      <div class="menu-usuario">
        <button class="boton-usuario" id="boton-usuario" type="button"
                aria-haspopup="true" aria-expanded="false" aria-controls="tarjeta-usuario"
                aria-label="Menú de usuario">
          <img src="assets/img/personajes/buho.png" alt="" style="object-position:50% 12%">
        </button>
        <div class="tarjeta-usuario" id="tarjeta-usuario" hidden>
          <div class="tarjeta-usuario-perfil">
            <span class="avatar-mini"><img src="assets/img/personajes/buho.png" alt="" style="object-position:50% 12%"></span>
            <div>
              <div class="tarjeta-usuario-nombre">Owliver</div>
              <div class="tarjeta-usuario-alias">Invitado de la comunidad</div>
            </div>
          </div>
          <div class="tarjeta-usuario-funciones">
            <a href="#" id="btn-editar-perfil">Elegir mi personaje</a>
            <a href="nosotros.html">Quiénes somos</a>
            <span class="proximamente">Notificaciones · próximamente</span>
          </div>
          <div class="tarjeta-usuario-etiqueta">Insignias · próximamente</div>
          <div class="tarjeta-usuario-insignias">
            <span class="mini-insignia" title="Cría curiosa">🥚</span>
            <span class="mini-insignia" title="Oyente fiel">🎧</span>
            <span class="mini-insignia" title="Voz del foro">💬</span>
            <span class="mini-insignia" title="Madruga-iguana">☀️</span>
          </div>
        </div>
      </div>
    </div>`;

  const saltar = document.createElement("a");
  saltar.className = "saltar";
  saltar.href = "#contenido";
  saltar.textContent = "Saltar al contenido";

  document.body.prepend(encabezado);
  document.body.prepend(saltar);
}


/* ---------- El pie ---------- */
function construirPie() {
  const pie = document.createElement("footer");
  pie.className = "pie-pagina";
  pie.innerHTML = `
    <div class="contenedor pie-interior">
      <a class="pie-marca" href="index.html" aria-label="Volver al inicio">
        <img src="assets/img/marca/logo-oficial-blanco.png" alt="Un café con la iguana">
      </a>
      <div class="pie-texto">
        <div data-redes class="redes-pie"></div>
        <p>
          Desarrollado por el Semillero Maker de Tecnología con Sentido del Colegio INJUV.
          <a href="nosotros.html#desarrollo">Quiénes somos</a>
        </p>
      </div>
      <div class="pie-colegio">
        <img src="assets/img/marca/injuv-imagotipo.png" alt="Escudo del Colegio INJUV, Instituto Infantil y Juvenil">
        <span><strong>Colegio INJUV</strong>Instituto Infantil y Juvenil</span>
      </div>
    </div>`;
  document.body.append(pie);
}


/* ---------- Menú de usuario ---------- */
function activarMenuUsuario() {
  const boton = document.getElementById("boton-usuario");
  const tarjeta = document.getElementById("tarjeta-usuario");

  const cerrar = () => {
    tarjeta.hidden = true;
    boton.setAttribute("aria-expanded", "false");
  };

  boton.addEventListener("click", (evento) => {
    evento.stopPropagation();
    const abrir = tarjeta.hidden;
    tarjeta.hidden = !abrir;
    boton.setAttribute("aria-expanded", String(abrir));
  });

  document.addEventListener("click", (evento) => {
    if (!tarjeta.hidden && !tarjeta.contains(evento.target)) cerrar();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrar();
  });
}


/* ---------- El buscador ----------
   Filtra cualquier elemento con data-buscable, en la página que sea.
   Si la página no tiene nada que filtrar (foro, nosotros), al
   buscar lleva al inicio con la búsqueda ya puesta. */

function normalizar(texto) {
  // Sin tildes ni mayúsculas: "conexion" encuentra "Conexión".
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function aplicarBusqueda() {
  const campo = document.getElementById("campo-busqueda");
  const texto = normalizar(campo.value.trim());

  document.body.classList.toggle("buscando", Boolean(texto));

  document.querySelectorAll("[data-buscable]").forEach((elemento) => {
    elemento.hidden = Boolean(texto) && !elemento.dataset.buscable.includes(texto);
  });

  document.querySelectorAll("main section").forEach((seccion) => {
    if (!seccion.querySelector("[data-buscable]")) return;

    const hayVisibles = [...seccion.querySelectorAll("[data-buscable]")].some((i) => !i.hidden);
    let aviso = seccion.querySelector(".sin-resultados");

    if (!hayVisibles && !aviso) {
      aviso = document.createElement("p");
      aviso.className = "sin-resultados";
      aviso.textContent = "Nada coincide con lo que buscaste.";
      seccion.append(aviso);
    } else if (hayVisibles && aviso) {
      aviso.remove();
    }
  });
}

function activarBuscador() {
  const formulario = document.querySelector(".buscador");
  const campo = document.getElementById("campo-busqueda");
  const hayQueFiltrar = () => document.querySelector("[data-lista], [data-buscable]");

  campo.addEventListener("input", aplicarBusqueda);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!hayQueFiltrar() && campo.value.trim()) {
      location.href = `index.html?q=${encodeURIComponent(campo.value.trim())}`;
    }
  });

  // Viene de otra página con una búsqueda ya escrita.
  const pedida = new URLSearchParams(location.search).get("q");
  if (pedida) campo.value = pedida;
}

window.normalizar = normalizar;
window.aplicarBusqueda = aplicarBusqueda;

construirEncabezado();
construirPie();
llenarRedes();
activarMenuUsuario();
activarBuscador();
