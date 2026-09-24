/* ===========================================================
   perfil.js — elegir un personaje para el perfil
   ===========================================================
   Los cuatro personajes salen del banner de FilosofArTec que hizo
   el equipo (carpeta "Logo e identidad de marca / Personajes").

   No hay cuentas ni login (ver D-06 y D-13 en la bitácora), así que
   la elección se guarda con localStorage: queda recordada en ESE
   navegador, en ESE computador. Si se abre el sitio en otro equipo,
   vuelve a preguntar.
   =========================================================== */

const PERSONAJES = [
  { id: "gato",   nombre: "Gato",   archivo: "assets/img/personajes/gato.jpg" },
  { id: "buho",   nombre: "Búho",   archivo: "assets/img/personajes/buho.jpg" },
  { id: "castor", nombre: "Castor", archivo: "assets/img/personajes/castor.jpg" },
  { id: "iguana", nombre: "Iguana", archivo: "assets/img/personajes/iguana.jpg" },
];

const CLAVE_GUARDADO = "iguana-personaje-elegido";


/* ---------- Guardar y aplicar ---------- */

function personajeGuardado() {
  try {
    return localStorage.getItem(CLAVE_GUARDADO);
  } catch (error) {
    return null; // modo privado, o el navegador bloquea localStorage
  }
}

function guardarPersonaje(id) {
  try {
    localStorage.setItem(CLAVE_GUARDADO, id);
  } catch (error) {
    // si no se puede guardar, igual se aplica para esta visita
  }
}

function aplicarPersonaje(id) {
  const personaje = PERSONAJES.find((p) => p.id === id);
  if (!personaje) return;

  document.querySelectorAll(".boton-usuario, .avatar-mini").forEach((elemento) => {
    elemento.innerHTML = `<img src="${personaje.archivo}" alt="Avatar: ${personaje.nombre}">`;
  });

  const nombre = document.querySelector(".tarjeta-usuario-nombre");
  const alias = document.querySelector(".tarjeta-usuario-alias");
  if (nombre) nombre.textContent = personaje.nombre;
  if (alias) alias.textContent = "tu personaje en La web de la iguana";
}


/* ---------- El modal "Elige tu personaje" ---------- */

function construirModalPerfil() {
  const fondo = document.createElement("div");
  fondo.className = "modal-fondo";
  fondo.id = "modal-perfil";
  fondo.hidden = true;

  const opciones = PERSONAJES.map((p) => `
    <button type="button" class="opcion-personaje" data-personaje="${p.id}">
      <img src="${p.archivo}" alt="">
      <span>${p.nombre}</span>
    </button>`).join("");

  fondo.innerHTML = `
    <div class="modal-perfil" role="dialog" aria-modal="true" aria-labelledby="titulo-modal-perfil">
      <button type="button" class="modal-cerrar" id="cerrar-modal-perfil" aria-label="Cerrar">✕</button>
      <h2 id="titulo-modal-perfil">Elige tu personaje</h2>
      <p>Así se te va a ver en el botón de usuario, mientras uses este navegador.</p>
      <div class="grid-personajes">${opciones}</div>
    </div>`;

  document.body.append(fondo);
  return fondo;
}

function abrirModalPerfil() {
  let modal = document.getElementById("modal-perfil");
  if (!modal) modal = construirModalPerfil();

  marcarSeleccionActual(modal);
  modal.hidden = false;
}

function cerrarModalPerfil() {
  const modal = document.getElementById("modal-perfil");
  if (modal) modal.hidden = true;
}

function marcarSeleccionActual(modal) {
  const actual = personajeGuardado();
  modal.querySelectorAll(".opcion-personaje").forEach((boton) => {
    boton.classList.toggle("seleccionado", boton.dataset.personaje === actual);
  });
}


/* ---------- Conectar todo ---------- */

function activarSelectorDePersonaje() {
  const enlaceEditar = document.getElementById("btn-editar-perfil");
  if (!enlaceEditar) return;

  enlaceEditar.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirModalPerfil();
  });

  // Un solo listener en document sirve para el modal completo,
  // aunque se reconstruya cada vez que se abre.
  document.addEventListener("click", (evento) => {
    const opcion = evento.target.closest(".opcion-personaje");
    if (opcion) {
      guardarPersonaje(opcion.dataset.personaje);
      aplicarPersonaje(opcion.dataset.personaje);
      cerrarModalPerfil();
      return;
    }

    if (evento.target.id === "cerrar-modal-perfil") {
      cerrarModalPerfil();
      return;
    }

    if (evento.target.id === "modal-perfil") {
      cerrarModalPerfil(); // clic en el fondo oscuro, fuera de la tarjeta
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrarModalPerfil();
  });
}

// Si ya habían elegido personaje antes, se aplica apenas carga la página.
const elegidoAntes = personajeGuardado();
if (elegidoAntes) aplicarPersonaje(elegidoAntes);

activarSelectorDePersonaje();
