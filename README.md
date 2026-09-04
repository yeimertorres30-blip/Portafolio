# Portafolio Web — Yeimer Torres

Portafolio profesional de **Yeimer Torres**, desarrollador web y móvil (Cúcuta, Colombia), construido con HTML, CSS y JavaScript puro (sin frameworks ni dependencias externas de build).

## 📄 Descripción

Sitio de una sola página (single page) que presenta la información profesional, proyectos y datos de contacto de Yeimer Torres, con secciones de navegación por anclas y modo claro/oscuro.

## 📁 Estructura del proyecto

```
portafolio/
├── index.html          # Página principal del portafolio
├── css/
│   └── styles.css      # Estilos del sitio
├── js/
│   └── main.js         # Interactividad (menú, tema claro/oscuro, animaciones, copiar email)
├── img/                # Imágenes de perfil y capturas de los proyectos
│   ├── Foto yeimer.png
│   ├── Proyecto tienda.png
│   ├── ECO-VIDA.png
│   └── Blog de cafe.png
└── assets/
    ├── favicon.svg
    └── Hoja de vida.rar   # 📎 Archivo comprimido con la(s) hoja(s) de vida / CV
```

> **Nota:** el botón **"Descargar CV"** del encabezado apunta a `assets/Hoja de vida.rar`, un comprimido que contiene la hoja de vida (currículum) de Yeimer Torres. Si vas a desplegar el sitio, asegúrate de incluir la carpeta `assets/` con ese archivo (y el `favicon.svg`) junto a `index.html`, `css/`, `js/` e `img/`.

## ✨ Secciones del sitio

- **Inicio** — presentación principal y llamados a la acción.
- **Sobre mí** — perfil, ubicación, enfoque, disponibilidad e idiomas.
- **Proyectos** — tarjetas con capturas, descripción, tecnologías usadas y enlaces a repositorio/demo:
  - Proyecto tienda (HTML, CSS, JavaScript)
  - ECO-VIDA (HTML, CSS)
  - Blog de café (HTML, CSS, JavaScript)
- **Habilidades** — Frontend (HTML5, CSS3, JavaScript), Backend (Python, MySQL) y Herramientas (Git, Vercel, Postman).
- **Contacto** — correo con botón de copiado rápido y enlaces a redes sociales (GitHub, LinkedIn, Twitter/X).

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)

## 🚀 Cómo usarlo

1. Descomprime/clona la carpeta `portafolio/` completa (incluyendo `assets/`).
2. Abre `index.html` directamente en el navegador, o sírvelo con un servidor local, por ejemplo:
   ```bash
   npx serve .
   ```
3. Para descargar la hoja de vida desde el sitio, el archivo `assets/Hoja de vida.rar` debe estar presente en esa ruta.

## ✏️ Personalización

En `index.html` hay comentarios `<!-- EDITA AQUÍ -->` que marcan los puntos donde se pueden actualizar:
- Proyectos adicionales.
- Correo de contacto.
- Enlaces reales de redes sociales.
- Nombre en el pie de página.

## 📬 Contacto

- **Email:** yeimertorres30@gmail.com
- **GitHub:** [github.com/yeimertorres30-blip](https://github.com/yeimertorres30-blip)

---
© Yeimer Torres. Hecho con HTML, CSS y JavaScript puro.
