/* ===========================================================
   carrusel-portada.js — la tarjeta movible de la portada
   ===========================================================
   Pasa sola de un destacado al siguiente (cada 5 s), siempre hacia
   la derecha, y vuelve al primero al terminar. Se detiene mientras
   el mouse o el dedo están encima, o si la persona tiene activado
   "reducir movimiento" en su sistema. También se puede mover con
   las flechas, los puntos o deslizando el dedo.

   Para agregar un destacado: un <figure class="destacado"> más
   dentro de .destacados-pista en index.html. Nada más.
   =========================================================== */

(function () {
  const marco = document.querySelector(".destacados");
  if (!marco) return;

  const pista = marco.querySelector(".destacados-pista");
  const diapositivas = [...pista.children];
  const INTERVALO = 5000;
  const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let actual = 0;
  let temporizador = null;

  /* --- Controles --- */
  const crear = (clase, html, etiqueta, accion) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = clase;
    boton.innerHTML = html;
    boton.setAttribute("aria-label", etiqueta);
    boton.addEventListener("click", accion);
    return boton;
  };

  const puntos = document.createElement("div");
  puntos.className = "destacados-puntos";
  diapositivas.forEach((_, i) =>
    puntos.append(crear("", "", `Ir al destacado ${i + 1}`, () => ir(i, true))));

  marco.append(
    crear("destacados-flecha anterior", "‹", "Destacado anterior", () => ir(actual - 1, true)),
    crear("destacados-flecha siguiente", "›", "Destacado siguiente", () => ir(actual + 1, true)),
    puntos
  );

  /* --- Mover --- */
  function ir(indice, manual) {
    actual = (indice + diapositivas.length) % diapositivas.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;

    diapositivas.forEach((d, i) => {
      d.inert = i !== actual;                       // lo que no se ve, no se enfoca
      d.setAttribute("aria-hidden", String(i !== actual));
    });
    [...puntos.children].forEach((p, i) => p.setAttribute("aria-current", String(i === actual)));

    if (manual) reiniciar();
  }

  function detener() { clearInterval(temporizador); temporizador = null; }

  function iniciar() {
    if (sinMovimiento || temporizador) return;
    temporizador = setInterval(() => ir(actual + 1), INTERVALO);
  }

  function reiniciar() { detener(); iniciar(); }

  /* --- Pausas --- */
  marco.addEventListener("mouseenter", detener);
  marco.addEventListener("mouseleave", iniciar);
  marco.addEventListener("focusin", detener);
  marco.addEventListener("focusout", iniciar);
  document.addEventListener("visibilitychange", () => (document.hidden ? detener() : iniciar()));

  /* --- Deslizar con el dedo --- */
  let inicioX = null;
  marco.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; detener(); }, { passive: true });
  marco.addEventListener("touchend", (e) => {
    if (inicioX !== null) {
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    }
    inicioX = null;
    iniciar();
  });

  ir(0);
  iniciar();
})();
