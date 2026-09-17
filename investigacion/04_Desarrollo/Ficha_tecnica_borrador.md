# Ficha técnica del proyecto — borrador para pasar al formato oficial

**Equipo 1 · La web de la iguana · Gabriel Giraldo y Samuel Gómez**
Borrador del 2026-09-03. Se copia a `Ficha_tecnica.docx` en esta misma carpeta.

> Este borrador está redactado a partir del boceto del 12 de agosto, del Formato 1 y del
> código que ya existe. **Revísenlo y corrijan lo que no coincida con lo que ustedes
> quieren.** Es un punto de partida, no una respuesta final.

---

## PASO 1 · Qué no logramos la semana pasada

| N.º | No logramos… | ¿Urgente? |
|---|---|---|
| 1 | No logramos que la página se viera con los estilos: el HTML busca `css/estilos.css` pero el archivo está suelto en la carpeta principal | Sí |
| 2 | No logramos que el botón "Inicio" llevara a la portada: el menú enlaza a `index.html` y nuestro archivo se llama `La web de la iguana.html` | Sí |
| 3 | No logramos publicar la página en internet: GitHub Pages no funciona en repositorios privados con cuenta gratuita | Sí |
| 4 | No logramos que el logo de la portada se viera igual que en las demás páginas | No |

---

## PASO 2 · Tres cosas que el proyecto debe hacer

Escritas como verbo + qué + cuándo, y con la prueba al lado.
**Estas tres frases son el criterio para decir que el sitio está terminado.**

| N.º | El proyecto debe… | ¿Cómo lo probamos? |
|---|---|---|
| 1 | **Mostrar en la portada los videos, los podcasts y los documentos más recientes**, tomándolos de un archivo de datos y no del HTML | Agregamos una entrada nueva al archivo `datos/videos.json`, recargamos la página y la tarjeta aparece sin haber tocado ningún archivo HTML |
| 2 | **Reproducir un video o un podcast dentro de la misma página**, al hacer clic en su tarjeta | Hacemos clic en una tarjeta de *New videos* y en una de *MP3 News*: en menos de 3 segundos se ve el video y se escucha el audio, sin salir del sitio |
| 3 | **Encontrar contenido escribiendo una palabra en el buscador** de la barra superior | Escribimos "iguana" y en la pantalla quedan solamente las tarjetas cuyo título o descripción contienen esa palabra; borramos el texto y vuelven a aparecer todas |

> Los tres se pueden comprobar en menos de un minuto y cualquiera del semillero puede
> hacerlo sin que le expliquemos. Eso es lo que pide el formato.

---

## PASO 3 · Con qué lo vamos a hacer

| Herramienta o material | Versión o referencia | ¿Ya lo tenemos? ¿Quién lo consigue? |
|---|---|---|
| Visual Studio Code | 1.136.1 | Sí, instalado |
| Extensión Live Server (VS Code) | Ritwick Dey, v5.7.x | **Falta.** La instalan los dos antes de la fase 1 |
| Git | 2.54.0 | Sí, instalado |
| GitHub Desktop | última versión | **Falta.** Lo instala el docente |
| Repositorio | `github.com/profenapaipa/lawebdelaiguana`, privado, 3 colaboradores | Sí, creado |
| GitHub Pages | publicación desde la carpeta `docs/` | **Falta.** Bloqueado: requiere GitHub Pro. Lo resuelve el docente |
| Navegador de prueba | Google Chrome, última versión | Sí |
| HTML5, CSS3 y JavaScript | sin framework ni compilador | — |
| Videos | canal de YouTube del proyecto | Sí, ya publicados. Samuel pasa los enlaces |
| Podcasts | programa en Spotify | Sí, ya publicados. Gabriel pasa los enlaces |
| Ilustración de la iguana con la taza | dibujo propio del equipo, escaneado | **Falta.** Sale del boceto del 12 de agosto |

**Ojo con el error que advierte el formato:** aquí no hay versiones de programas que puedan
desalinearse entre computadores, porque no usamos ningún compilador. Lo único que debe
coincidir es el navegador, y eso se prueba solo abriendo la página.

---

## PASO 4 · Cómo funciona por dentro: las tres cajas

```
┌────────────────────────┐   ┌──────────────────────────┐   ┌─────────────────────────┐
│      QUÉ ENTRA         │   │  QUÉ HACE CON ESO        │   │       QUÉ SALE          │
│                        │──▶│                          │──▶│                         │
│ Un administrador       │   │ El navegador lee ese     │   │ La portada con las tres │
│ escribe en un archivo  │   │ archivo, arma una tarjeta│   │ secciones del boceto:   │
│ de datos el título, la │   │ por cada entrada y las   │   │ New videos, MP3 News y  │
│ descripción y el       │   │ reparte en su sección.   │   │ DOCS news.              │
│ enlace de YouTube o    │   │ Si el visitante escribe  │   │                         │
│ de Spotify de un       │   │ en el buscador, filtra   │   │ Y, al hacer clic, el    │
│ contenido nuevo.       │   │ esa misma lista.         │   │ video o el podcast      │
│                        │   │                          │   │ reproduciéndose.        │
└────────────────────────┘   └──────────────────────────┘   └─────────────────────────┘
```

**En una frase:** entra el enlace de un contenido escrito por un administrador, el navegador
lo convierte en tarjetas y las filtra según lo que se busque, y sale la portada del sitio con
el contenido listo para reproducirse.

**La operación principal de la caja del medio** es *convertir una lista de datos en tarjetas
en pantalla*. Todo lo demás —el buscador, los carruseles, el reproductor— trabaja sobre esas
mismas tarjetas.

> **Pendiente:** dibujar estas tres cajas a mano en una hoja, tomarle foto y subirla a la
> carpeta `04_Desarrollo` con el nombre `esquema.jpg`. Lo pide el formato.

---

## Revisión antes de cerrar la ficha

- [x] Los cuatro pasos están llenos
- [x] En el paso 2, cada acción tiene escrito cómo se prueba
- [x] En el paso 3, lo que falta tiene un nombre y un responsable
- [ ] La foto del esquema (`esquema.jpg`) está subida
- [ ] La ficha quedó pasada al archivo `Ficha_tecnica.docx`
