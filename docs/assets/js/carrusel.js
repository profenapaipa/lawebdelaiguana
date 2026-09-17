/* ===========================================================
   carrusel.js — la flecha › que aparece a la derecha en el boceto
   ===========================================================
   Cada fila de tarjetas se desplaza a lo ancho. La flecha avanza
   una "pantalla" de tarjetas y se esconde sola cuando ya no hay
   más para mostrar.
   =========================================================== */

function activarCarrusel(carrusel) {
  const pista = carrusel.querySelector(".pista");
  const flecha = carrusel.querySelector(".flecha-carrusel");
  if (!pista || !flecha) return;

  function actualizarFlecha() {
    // Queda espacio a la derecha? (los 4px son margen de error del navegador)
    const faltaPorVer = pista.scrollWidth - pista.clientWidth - pista.scrollLeft > 4;
    flecha.hidden = !faltaPorVer;
  }

  flecha.addEventListener("click", () => {
    const final = pista.scrollWidth - pista.clientWidth - pista.scrollLeft <= 4;

    if (final) {
      pista.scrollTo({ left: 0 });          // vuelve al principio
    } else {
      pista.scrollBy({ left: pista.clientWidth * 0.8 });
    }
  });

  pista.addEventListener("scroll", actualizarFlecha);
  window.addEventListener("resize", actualizarFlecha);

  // El contenido lo pinta contenido.js después, así que se revisa
  // cada vez que cambien las tarjetas de adentro.
  new MutationObserver(actualizarFlecha).observe(pista, { childList: true });

  actualizarFlecha();
}

document.querySelectorAll(".carrusel").forEach(activarCarrusel);
