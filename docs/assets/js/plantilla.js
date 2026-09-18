/* ===========================================================
   plantilla.js — el encabezado, las barras y el pie, en un solo lugar
   ===========================================================
   La maquetación es la del avance del 17 de septiembre: el
   encabezado con la marca, el menú de usuario con mini-insignias,
   la barra superior y la barra lateral. No se cambió nada de eso.

   Lo único que cambia es que ya no está copiada en las 5 páginas:
   se escribe aquí una vez y se inyecta sola. Cambiar un enlace del
   menú pasa de 5 ediciones a 1.

   Cada página dice quién es con  <body data-pagina="videos">
   y así se marca sola la pestaña activa.
   =========================================================== */

const SECCIONES = [
  { id: "videos",     href: "videos.html",     icono: "▶",  texto: "Videos" },
  { id: "podcasts",   href: "podcasts.html",   icono: "🎧", texto: "Podcasts" },
  { id: "documentos", href: "documentos.html", icono: "📄", texto: "Docs" },
  { id: "foro",       href: "foro.html",       icono: "💬", texto: "Foro" },
];

const paginaActual = document.body.dataset.pagina || "";
const esInicio = paginaActual === "inicio";


/* ---------- Encabezado: marca · buscador · menú de usuario ---------- */
function construirEncabezado() {
  const encabezado = document.createElement("header");
  encabezado.className = "encabezado";
  encabezado.innerHTML = `
    <a class="encabezado-marca" href="index.html">
      <img src="assets/img/logo-iguana.webp" class="logo" alt="Logo de la iguana">
      <div>
        <div class="titulo-sitio">La web de la iguana</div>
        <div class="eslogan">Un café con la iguana</div>
      </div>
    </a>

    <form class="buscador" role="search" onsubmit="return false">
      <span class="lupa" aria-hidden="true">🔍</span>
      <input type="search" id="campo-busqueda" placeholder="¿En qué piensas?"
             autocomplete="off" aria-label="Buscar en el sitio">
    </form>

    <div class="menu-usuario">
      <button class="boton-usuario" id="boton-usuario" type="button"
              aria-haspopup="true" aria-expanded="false" aria-label="Menú de usuario">
        <span aria-hidden="true">🙂</span>
      </button>
      <div class="tarjeta-usuario" id="tarjeta-usuario" hidden>
        <div class="tarjeta-usuario-perfil">
          <span class="avatar-mini" aria-hidden="true">🙂</span>
          <div>
            <div class="tarjeta-usuario-nombre">Invitado</div>
            <div class="tarjeta-usuario-alias">sin cuenta todavía</div>
          </div>
        </div>
        <div class="tarjeta-usuario-funciones">
          <a href="#">⚙️ Editar perfil</a>
          <a href="#">🔔 Notificaciones</a>
          <a href="#">🚪 Cerrar sesión</a>
        </div>
        <div class="tarjeta-usuario-etiqueta">Insignias</div>
        <div class="tarjeta-usuario-insignias">
          <span class="mini-insignia bloqueada" title="Cría curiosa">🥚</span>
          <span class="mini-insignia bloqueada" title="Oyente fiel">🎧</span>
          <span class="mini-insignia bloqueada" title="Voz del foro">💬</span>
          <span class="mini-insignia bloqueada" title="Madruga-iguana">☀️</span>
        </div>
      </div>
    </div>`;

  document.body.prepend(encabezado);
}


/* ---------- Barra superior y barra lateral ---------- */
function construirBarras() {
  const enlaces = SECCIONES.map((s) => `
    <a href="${s.href}" ${s.id === paginaActual ? 'class="activo" aria-current="page"' : ""}>
      <span aria-hidden="true">${s.icono}</span> ${s.texto}
    </a>`).join("");

  const superior = document.createElement("nav");
  superior.className = "barra-superior";
  superior.innerHTML = enlaces;

  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-principal";
  contenedor.innerHTML = `
    <nav class="barra-lateral">
      <a href="index.html" ${esInicio ? 'class="activo" aria-current="page"' : ""}>
        <span class="icono" aria-hidden="true">🏠</span>
        Inicio
      </a>
    </nav>`;

  // El <main> de la página se mete dentro del contenedor, al lado de la lateral.
  const principal = document.querySelector("main.contenido");
  const encabezado = document.querySelector(".encabezado");
  encabezado.after(superior);
  superior.after(contenedor);
  contenedor.append(principal);
}


/* ---------- El pie ---------- */
function construirPie() {
  const pie = document.createElement("footer");
  pie.className = "pie-pagina";
  pie.textContent = "Hecho con 🦎 por el Equipo 1 del Semillero de Tecnología Maker — La web de la iguana";
  document.body.append(pie);
}


/* ---------- Menú de usuario ----------
   Tal como lo escribieron el 17 de septiembre: usa el atributo
   hidden, que es más limpio que jugar con opacidad. */
function activarMenuUsuario() {
  const botonUsuario = document.getElementById("boton-usuario");
  const tarjetaUsuario = document.getElementById("tarjeta-usuario");
  if (!botonUsuario || !tarjetaUsuario) return;

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


/* ---------- El buscador ----------
   Filtra cualquier elemento con data-buscable, en la página que sea. */
function activarBuscador() {
  const campo = document.getElementById("campo-busqueda");
  if (!campo) return;

  campo.addEventListener("input", () => {
    const texto = normalizar(campo.value.trim());

    document.querySelectorAll("[data-buscable]").forEach((elemento) => {
      elemento.hidden = Boolean(texto) && !elemento.dataset.buscable.includes(texto);
    });

    document.querySelectorAll(".contenido section").forEach((seccion) => {
      const items = seccion.querySelectorAll("[data-buscable]");
      if (!items.length) return;

      const hayVisibles = [...items].some((i) => !i.hidden);
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
  });
}

/* Se quitan las tildes para que "conexion" encuentre "Conexión". */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

window.normalizar = normalizar;

construirEncabezado();
construirBarras();
construirPie();
activarMenuUsuario();
activarBuscador();
