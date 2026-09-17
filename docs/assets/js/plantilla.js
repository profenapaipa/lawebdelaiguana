/* ===========================================================
   plantilla.js — la barra de arriba y el pie, en un solo lugar
   ===========================================================
   Antes la barra estaba copiada en las 6 páginas: cambiar un
   enlace eran 6 ediciones. Ahora se escribe aquí una vez y se
   inyecta sola en todas.

   Cada página dice quién es con  <body data-pagina="videos">
   y así se marca sola la pestaña activa.
   =========================================================== */

const ACCESOS = [
  { id: "videos",      href: "videos.html",      icono: "▶",  texto: "Videos" },
  { id: "podcasts",    href: "podcasts.html",    icono: "🎧", texto: "Podcasts" },
  { id: "documentos",  href: "documentos.html",  icono: "📄", texto: "Docs" },
  { id: "foro",        href: "foro.html",        icono: "💬", texto: "Foro" },
];

const paginaActual = document.body.dataset.pagina || "";

/* ---------- La barra de arriba ---------- */
function construirBarra() {
  const enlaces = ACCESOS.map((a) => `
      <a href="${a.href}" ${a.id === paginaActual ? 'class="activo" aria-current="page"' : ""}>
        <span aria-hidden="true">${a.icono}</span><small>${a.texto}</small>
      </a>`).join("");

  const barra = document.createElement("header");
  barra.className = "barra-sitio";
  barra.innerHTML = `
    <a class="marca" href="index.html">
      <img src="assets/img/logo-iguana.webp" alt="La web de la iguana">
      <span class="nombre">La web de la iguana<small>Un café con la iguana</small></span>
    </a>

    <form class="buscador" role="search" onsubmit="return false">
      <span class="lupa" aria-hidden="true">🔍</span>
      <input type="search" id="campo-busqueda" placeholder="¿En qué piensas?"
             autocomplete="off" aria-label="Buscar en el sitio">
    </form>

    <nav class="accesos" aria-label="Secciones">${enlaces}</nav>

    <div class="usuario-dropdown">
      <button class="btn-usuario" id="btnUsuario" aria-expanded="false" aria-controls="tarjetaUsuario">
        <span class="icono-usuario" aria-hidden="true">👤</span>
      </button>
      <div class="tarjeta-usuario" id="tarjetaUsuario">
        <div class="cabecera-tarjeta">
          <div class="avatar-mini" aria-hidden="true">🦎</div>
          <div class="info-usuario-mini">
            <p class="nombre-usuario">Equipo 1</p>
            <p class="alias-usuario">Semillero de Tecnología</p>
          </div>
        </div>
        <div class="opciones-usuario">
          <a href="usuario.html" class="opcion-usuario"><span aria-hidden="true">👤</span> El equipo</a>
          <a href="usuario.html#insignias" class="opcion-usuario"><span aria-hidden="true">🏆</span> Insignias</a>
        </div>
      </div>
    </div>`;

  document.body.prepend(barra);
}

/* ---------- El pie ---------- */
function construirPie() {
  const pie = document.createElement("footer");
  pie.className = "pie-pagina";
  pie.innerHTML = `Hecho con 🦎 por el Equipo 1 del Semillero de Tecnología Maker — La web de la iguana`;
  document.body.append(pie);
}

/* ---------- El menú de perfil ----------
   El CSS ya esperaba la clase .activa; faltaba quien se la pusiera. */
function activarDropdown() {
  const boton = document.getElementById("btnUsuario");
  const tarjeta = document.getElementById("tarjetaUsuario");
  if (!boton || !tarjeta) return;

  boton.addEventListener("click", (evento) => {
    evento.stopPropagation();
    const abierto = tarjeta.classList.toggle("activa");
    boton.setAttribute("aria-expanded", String(abierto));
  });

  // Se cierra al hacer clic afuera o con la tecla Escape.
  document.addEventListener("click", () => {
    tarjeta.classList.remove("activa");
    boton.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      tarjeta.classList.remove("activa");
      boton.setAttribute("aria-expanded", "false");
    }
  });

  tarjeta.addEventListener("click", (evento) => evento.stopPropagation());
}

/* ---------- El buscador ----------
   Filtra cualquier elemento que tenga data-buscable, en la página
   que sea. Así el mismo buscador sirve en inicio, videos y podcasts. */
function activarBuscador() {
  const campo = document.getElementById("campo-busqueda");
  if (!campo) return;

  campo.addEventListener("input", () => {
    const texto = normalizar(campo.value.trim());

    document.querySelectorAll("[data-buscable]").forEach((elemento) => {
      const coincide = !texto || elemento.dataset.buscable.includes(texto);
      elemento.hidden = !coincide;
    });

    // En cada sección, avisar si no quedó nada visible.
    document.querySelectorAll(".seccion").forEach((seccion) => {
      const items = seccion.querySelectorAll("[data-buscable]");
      if (!items.length) return;

      const visibles = [...items].some((i) => !i.hidden);
      let aviso = seccion.querySelector(".sin-resultados");

      if (!visibles && !aviso) {
        aviso = document.createElement("p");
        aviso.className = "sin-resultados";
        aviso.textContent = "Nada coincide con lo que buscaste.";
        seccion.append(aviso);
      } else if (visibles && aviso) {
        aviso.remove();
      }
    });
  });
}

/* Se normaliza el texto para que "Conexión" se encuentre escribiendo "conexion". */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

construirBarra();
construirPie();
activarDropdown();
activarBuscador();

window.normalizar = normalizar;
