/* ===========================================================
   decoracion.js — siembra los símbolos del colegio como decoración
   ===========================================================
   Cada ícono es un dibujo de línea (viewBox 64) que toma el color de
   la paleta. Aquí se decide DÓNDE va cada uno; cómo se ve y cómo se
   mueve está en decoracion.css.

   Para mover o quitar uno basta con editar las listas de abajo:
     i  ícono            x, y  posición en % del contenedor
     t  tamaño en px     c  color (ambar | marino | teal | verde | arcilla)
     a  movimiento (flotar | girar | pulsar | mecer)
     r  giro inicial     d  segundos que dura   z  segundos de retraso
     l  true = lateral (solo se ve en pantallas anchas)
     w  true = se esconde en celular
   =========================================================== */

(function () {
  const ICONOS = {
    cohete:  '<path d="M32 5c10 8 14 20 12 35H20C18 25 22 13 32 5z"/><circle cx="32" cy="24" r="5"/><path d="M20 40l-9 10 11-3M44 40l9 10-11-3M28 46c0 6 2 10 4 13 2-3 4-7 4-13"/>',
    libro:   '<path d="M6 13c9-3 18-3 26 3 8-6 17-6 26-3v35c-9-3-18-3-26 3-8-6-17-6-26-3z"/><path d="M32 16v35"/>',
    matraz:  '<path d="M25 6h14M28 6v17L11 52c-2 4 0 7 4 7h34c4 0 6-3 4-7L36 23V6"/><path d="M17 41h30"/><circle cx="29" cy="48" r="2"/><circle cx="38" cy="45" r="1.5"/>',
    globo:   '<circle cx="32" cy="28" r="20"/><path d="M12 28h40M32 8c-9 12-9 28 0 40M32 8c9 12 9 28 0 40M22 56h20M32 48v8"/>',
    lapiz:   '<path d="M9 55l4-15L43 10l11 11-30 30z"/><path d="M38 15l11 11M13 40l11 11"/>',
    bombilla:'<path d="M32 6a16 16 0 0 0-9 29c2 2 3 4 3 8h12c0-4 1-6 3-8A16 16 0 0 0 32 6z"/><path d="M26 49h12M28 55h8M32 14v8"/>',
    birrete: '<path d="M32 12L5 26l27 14 27-14z"/><path d="M15 33v13c9 7 25 7 34 0V33M59 26v18"/>',
    atomo:   '<ellipse cx="32" cy="32" rx="27" ry="10"/><ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(-60 32 32)"/><circle class="relleno" cx="32" cy="32" r="3.5"/>',
    nota:    '<circle cx="18" cy="47" r="7"/><circle cx="45" cy="41" r="7"/><path d="M25 47V14l27-7v34"/>',
    estrella:'<path d="M32 6l8 17 18 2-13 13 4 18-17-9-17 9 4-18L6 25l18-2z"/>',
    // Las formas redondeadas del manual: X, + y O
    equis:   '<path class="grueso" d="M14 14l36 36M50 14L14 50"/>',
    mas:     '<path class="grueso" d="M32 10v44M10 32h44"/>',
    anillo:  '<circle class="grueso" cx="32" cy="32" r="22"/>',
  };

  const SITIOS = {
    // Portada: entre el texto y la tarjeta, y en las esquinas libres
    ".portada": [
      { i: "cohete",  x: 45, y: 5,  t: 62, c: "marino", a: "flotar", r: 12,  d: 6 },
      { i: "estrella",x: 49, y: 46, t: 34, c: "ambar",  a: "pulsar", r: 0,   d: 4,  z: 1 },
      { i: "matraz",  x: 42, y: 74, t: 52, c: "teal",   a: "mecer",  r: 0,   d: 5,  z: 2, w: true },
      { i: "equis",   x: 93, y: 82, t: 30, c: "ambar",  a: "girar",  d: 24 },
      { i: "anillo",  x: 41, y: 12, t: 26, c: "verde",  a: "flotar", d: 8,  z: 3, w: true },
      { i: "nota",    x: 90, y: 6,  t: 40, c: "arcilla",a: "mecer",  r: 8,   d: 6,  w: true },
    ],
    // Cabeceras de página: al lado derecho del título
    ".cabecera-pagina": [
      { i: "libro",    x: 62, y: 18, t: 54, c: "marino", a: "flotar", r: -6, d: 7,  w: true },
      { i: "bombilla", x: 72, y: 52, t: 44, c: "ambar",  a: "mecer",  r: 0,  d: 5,  z: 1, w: true },
      { i: "atomo",    x: 80, y: 14, t: 52, c: "teal",   a: "girar",  d: 20, w: true },
      { i: "estrella", x: 55, y: 62, t: 28, c: "verde",  a: "pulsar", d: 4,  z: 2, w: true },
    ],
    // El resto de la página: a los lados, solo en pantallas anchas
    "main#contenido": [
      { i: "birrete",  x: 2,  y: 14, t: 66, c: "marino", a: "flotar", r: -8, d: 8,  l: true },
      { i: "globo",    x: 95, y: 24, t: 62, c: "teal",   a: "mecer",  r: 6,  d: 7,  l: true },
      { i: "lapiz",    x: 2,  y: 38, t: 58, c: "ambar",  a: "flotar", r: 10, d: 9,  z: 1, l: true },
      { i: "cohete",   x: 95, y: 52, t: 64, c: "verde",  a: "flotar", r: 14, d: 7,  l: true },
      { i: "matraz",   x: 2,  y: 64, t: 56, c: "teal",   a: "mecer",  d: 6,  z: 2, l: true },
      { i: "nota",     x: 95, y: 76, t: 50, c: "arcilla",a: "flotar", d: 8,  l: true },
      { i: "bombilla", x: 2,  y: 86, t: 54, c: "ambar",  a: "mecer", d: 5,  z: 1, l: true },
      { i: "mas",      x: 94, y: 92, t: 34, c: "marino", a: "girar",  d: 30, l: true },
    ],
  };

  function crear(c) {
    const el = document.createElement("span");
    el.className = `deco deco-${c.c} anim-${c.a}${c.l ? " deco-lateral" : ""}${c.w ? " deco-ancho" : ""}`;
    el.style.left = c.x + "%";
    el.style.top = c.y + "%";
    el.style.width = c.t + "px";
    el.style.setProperty("--rot", (c.r || 0) + "deg");
    el.style.setProperty("--dur", (c.d || 7) + "s");
    el.style.setProperty("--ret", (c.z || 0) + "s");
    if (c.r) el.style.transform = `rotate(${c.r}deg)`;
    el.innerHTML = `<svg viewBox="0 0 64 64" focusable="false">${ICONOS[c.i]}</svg>`;
    return el;
  }

  Object.entries(SITIOS).forEach(([selector, lista]) => {
    const contenedor = document.querySelector(selector);
    if (!contenedor) return;

    const capa = document.createElement("div");
    capa.className = "decoracion";
    capa.setAttribute("aria-hidden", "true");
    lista.forEach((c) => capa.append(crear(c)));
    contenedor.prepend(capa);
  });
})();
