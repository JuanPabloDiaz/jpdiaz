---
title: 'Jekyll: La forma más sencilla de crear sitios web estáticos con GitHub Pages'
description: 'Descubre cómo Jekyll y GitHub Pages pueden transformar tu experiencia de desarrollo web'
pubDate: 2025-03-23
lang: 'es'
tags:
  - Jekyll
  - GithubPages
  - DesarrolloWeb
draft: false
---

Cuando comencé mi carrera como desarrollador web, siempre pensaba que necesitaba configurar un servidor complejo o aprender tecnologías avanzadas para crear un sitio web decente. Para mi sorpresa, un día descubrí Jekyll y cambió completamente mi perspectiva sobre el desarrollo web estático. En este artículo, quiero compartir por qué Jekyll se ha convertido en una de mis herramientas favoritas y cómo puedes aprovecharlo para crear sitios web impresionantes con un mínimo esfuerzo.

## ¿Qué es Jekyll?

Jekyll es un generador de sitios estáticos, desarrollado en Ruby, que transforma archivos de texto plano en un sitio web o blog completamente funcional. A diferencia de los CMS tradicionales como WordPress, que requieren una base de datos y código del lado del servidor, Jekyll genera archivos HTML estáticos que pueden ser alojados en cualquier servidor web.

Lo más interesante es que **GitHub Pages funciona con Jekyll por debajo**, lo que significa que puedes desplegar tu sitio web directamente desde tu repositorio de GitHub sin necesidad de configuraciones adicionales.

## Casos de uso ideales para Jekyll

Jekyll destaca especialmente en ciertos escenarios que vale la pena considerar:

### Blogs personales y portfolios

Jekyll fue originalmente diseñado como un motor de blogs, y sigue siendo una de sus aplicaciones más comunes. La estructura orientada a posts, el soporte para categorías y etiquetas, y la facilidad para crear páginas estáticas lo hacen ideal para:

- Blogs de desarrollo
- Portfolios profesionales
- Sitios personales

### Sitios para proyectos de código abierto

La integración con GitHub Pages hace que Jekyll sea perfecto para proyectos de código abierto:

- Documentación técnica de proyectos
- Páginas de presentación de bibliotecas o frameworks
- Wikis de proyectos colaborativos

### Sitios con presupuesto limitado

Para organizaciones pequeñas, startups o individuos con presupuesto limitado, Jekyll ofrece:

- Hosting gratuito en GitHub Pages
- Sin costos de mantenimiento de servidores
- Sin necesidad de actualizaciones constantes de seguridad

### Proyectos que priorizan la seguridad

Al generar sitios completamente estáticos, Jekyll elimina muchos vectores de ataque comunes:

- Sin bases de datos que puedan ser comprometidas
- Sin código server-side que pueda contener vulnerabilidades
- Menor superficie de ataque en general

## Cómo empezar con Jekyll y GitHub Pages

::github{repo="jekyll/jekyll"}

Vamos a ver paso a paso cómo crear tu primer sitio con Jekyll y desplegarlo en GitHub Pages:

### Paso 1: Instalación de Jekyll

Para instalar Jekyll, necesitas Ruby y RubyGems instalados en tu sistema. Luego, puedes instalar Jekyll con:

```bash
gem install jekyll bundler
```

### Paso 2: Crear un nuevo sitio Jekyll

Crea un nuevo sitio Jekyll con:

```bash
jekyll new mi-increible-sitio
cd mi-increible-sitio
```

### Paso 3: Vista previa local

Puedes ver tu sitio localmente con:

```bash
bundle exec jekyll serve
```

Ahora visita `http://localhost:4000` en tu navegador para ver tu sitio.

### Paso 4: Configuración básica

El archivo `_config.yml` es el corazón de la configuración de tu sitio Jekyll. Aquí puedes definir el título, descripción, tema y otras opciones:

```yaml
title: Mi Increíble Sitio
description: >-
  Este es mi nuevo sitio web creado con Jekyll y GitHub Pages.
baseurl: '' # Si tu sitio está en un subdominio de GitHub Pages
url: 'https://tuusuario.github.io' # La URL base de tu sitio
theme: minima # El tema que deseas usar
```

### Paso 5: Crear contenido

Jekyll utiliza Markdown para el contenido. Para crear un nuevo post, añade un archivo en la carpeta `_posts` siguiendo la convención de nombres `AAAA-MM-DD-titulo-del-post.md`:

```markdown
---
layout: post
title: 'Mi primer post con Jekyll'
date: 2023-03-23
categories: jekyll tutorial
---

Este es mi primer post utilizando Jekyll. ¡Es increíblemente fácil crear contenido!
```

### Paso 6: Despliegue en GitHub Pages

1. Crea un nuevo repositorio en GitHub
2. Inicializa Git en tu directorio local y conecta con el repositorio remoto:

```bash
git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/tuusuario/tuusuario.github.io.git
git push -u origin main
```

3. Ve a la configuración del repositorio, navega a la sección "Pages" y selecciona la rama principal como fuente.

¡Y eso es todo! Tu sitio estará disponible en `https://tuusuario.github.io` en unos minutos.

## Plantillas y temas: Personalización sin esfuerzo

Una de las características más atractivas de Jekyll es la abundancia de temas disponibles. Algunos lugares donde puedes encontrar temas gratuitos y premium:

- [Jekyll Themes](https://jekyllthemes.io/)
- [GitHub Pages Themes](https://pages.github.com/themes/)
- [JekyllThemes.org](http://jekyllthemes.org/)
- [RubyGems](https://rubygems.org/search?query=jekyll-theme)

Instalar un tema es tan sencillo como agregar una línea a tu `_config.yml` o instalar la gema correspondiente.

## Más allá de lo básico: Potenciando Jekyll

### Colecciones

Las colecciones te permiten agrupar contenido relacionado que no sigue necesariamente una estructura cronológica como los posts:

```yaml
# En _config.yml
collections:
  proyectos:
    output: true
```

Luego creas una carpeta `_proyectos` y añades archivos Markdown para cada proyecto.

### Data Files

Jekyll permite cargar datos desde archivos YAML, JSON o CSV en la carpeta `_data`:

```yaml
# _data/redes_sociales.yml
- nombre: Twitter
  url: https://twitter.com/tuusuario
  icono: twitter

- nombre: GitHub
  url: https://github.com/tuusuario
  icono: github
```

Que puedes usar en tus plantillas:

```liquid
{% for red in site.data.redes_sociales %}
  <a href="{{ red.url }}">{{ red.nombre }}</a>
{% endfor %}
```

## Jekyll vs. Otros Generadores de Sitios Estáticos

El ecosistema de generadores de sitios estáticos (SSG) y herramientas de documentación ha crecido considerablemente en los últimos años. Comparemos Jekyll con algunas de las alternativas más populares para entender por qué podría ser la mejor opción para muchos casos de uso.

### Generadores de Sitios Estáticos (SSG)

| Herramienta | Estrellas GitHub | Lenguaje           | Ventajas                                            | Desventajas                                                       |
| ----------- | ---------------- | ------------------ | --------------------------------------------------- | ----------------------------------------------------------------- |
| **Hugo**    | ⭐ 80.9k         | Go                 | Extremadamente rápido, soporte para sitios grandes  | Curva de aprendizaje pronunciada, sintaxis de plantillas compleja |
| **Nuxt**    | ⭐ 57.1k         | JavaScript (Vue)   | Gran ecosistema Vue, SSR incorporado                | Mayor complejidad, requiere conocimientos de Vue                  |
| **Jekyll**  | ⭐ 50.0k         | Ruby               | Simple, integración nativa con GitHub Pages, maduro | Velocidad de compilación más lenta en sitios grandes              |
| **Gatsby**  | ⭐ 55.9k         | JavaScript (React) | Potente sistema de plugins, GraphQL integrado       | Mayor complejidad, curva de aprendizaje pronunciada               |
| **Hexo**    | ⭐ 40.3k         | JavaScript         | Rápido, orientado a blogs                           | Menos flexible para sitios no-blog                                |

> _Datos extraídos de mi proyecto open source [Free For Geeks: Static Site Generator](https://freeforgeeks.jpdiaz.dev/#/?id=static-site-generator)_

#### Lo que distingue a Jekyll:

1. **Integración nativa con GitHub Pages**: A diferencia de sus competidores, Jekyll es la única opción integrada directamente con GitHub Pages sin configuración adicional.

2. **Simplicidad sobre complejidad**: Mientras Hugo es más rápido y Gatsby más potente en ciertos aspectos, Jekyll mantiene un equilibrio perfecto entre funcionalidad y facilidad de uso.

3. **Madurez y estabilidad**: Con más de una década de desarrollo, Jekyll tiene una comunidad establecida y una base de código estable, a diferencia de opciones más nuevas que pueden cambiar rápidamente.

4. **Enfoque en el contenido**: Jekyll está diseñado para permitirte centrarte en escribir contenido en Markdown, no en aprender complejidades técnicas.

### Herramientas de Documentación Especializadas

| Herramienta    | Estrellas GitHub | Enfoque                        | Diferencias con Jekyll                               |
| -------------- | ---------------- | ------------------------------ | ---------------------------------------------------- |
| **Docusaurus** | ⭐ 59.9k         | Documentación técnica          | Orientado específicamente a documentación, con React |
| **Docsify**    | ⭐ 29.3k         | Documentación sin compilación  | No genera archivos estáticos, requiere JavaScript    |
| **GitBook**    | ⭐ 27.9k         | Documentación colaborativa     | Más orientado a equipos, menos personalizable        |
| **MkDocs**     | ⭐ 20.4k         | Documentación simple en Python | Más sencillo que Jekyll, pero menos flexible         |
| **Starlight**  | ⭐ 6.4k          | Documentación con Astro        | Moderno, enfocado en rendimiento                     |

> _Datos sobre herramientas de documentación extraídos de mi proyecto open source [Free For Geeks: Documentation](https://freeforgeeks.jpdiaz.dev/#/?id=documentation)_

#### ¿Por qué elegir Jekyll sobre herramientas de documentación?

1. **Versatilidad**: Mientras herramientas como Docsify o MkDocs están optimizadas exclusivamente para documentación, Jekyll es versátil y puede servir para blogs, portafolios, sitios corporativos, documentación y más.

2. **Control total**: Jekyll te da control completo sobre la estructura y el diseño de tu sitio, a diferencia de soluciones como GitBook.

3. **Sin dependencia de JavaScript**: A diferencia de Docsify que requiere JavaScript para funcionar, los sitios Jekyll son HTML puro y funcionan incluso sin JavaScript habilitado.

4. **Un solo ecosistema**: Con Jekyll puedes usar el mismo sistema para tu blog, documentación y sitio web, sin necesidad de aprender múltiples herramientas.

## Por qué Jekyll podría ser tu mejor opción

Jekyll sigue siendo relevante en 2025 por varias razones:

1. **Simplicidad**: En un mundo de frameworks cada vez más complejos, Jekyll mantiene las cosas simples.
2. **Seguridad**: Sin bases de datos ni código dinámico, los sitios Jekyll son inherentemente más seguros.
3. **Bajo costo**: Con GitHub Pages, puedes alojar tu sitio gratuitamente.
4. **Control de versiones integrado**: Todo tu sitio está bajo control de versiones en Git.
5. **SEO-friendly**: Los sitios estáticos tienden a cargar más rápido, lo que favorece el SEO.
6. **Enfoque en el contenido**: Jekyll te permite centrarte en escribir, no en luchar con la tecnología.

## Mis proyectos con Jekyll

He utilizado Jekyll en varios proyectos personales, atraído por su simplicidad y flexibilidad. Su enfoque en la creación de contenido me ha permitido desarrollar sitios web eficientes y adaptados a mis necesidades, evitando configuraciones complejas. Valoro especialmente la posibilidad de usar themas y plugins para personalizar la apariencia y funcionalidad de mis sitios. al igual que la integración con GitHub Pages y la gran comunidad de desarrolladores que lo respalda.

::github{repo="juanpablodiaz/doc"}

::github{repo="JuanPabloDiaz/freecodecamp_certifications"}

## Conclusión

Jekyll y GitHub Pages forman una combinación imbatible para desarrolladores que buscan una solución simple, rápida y económica para crear sitios web estáticos. Aunque existen alternativas más modernas como Hugo, Gatsby o herramientas especializadas como Docusaurus, la simplicidad de Jekyll y su integración nativa con GitHub Pages lo convierten en una opción difícil de superar para muchos proyectos.

Desde blogs personales hasta documentación de proyectos o portafolios profesionales, Jekyll ofrece una flexibilidad sorprendente sin la complejidad de otras plataformas. No necesitas ser un experto en programación para crear un sitio web profesional con Jekyll.

Si nunca has probado Jekyll, te animo a que le des una oportunidad. Podrías descubrir, como yo, que a veces las tecnologías más simples son las que ofrecen la mejor experiencia de desarrollo.

¿Has usado Jekyll para algún proyecto? ¿Has probado otras alternativas como Hugo o Docsify? ¿Tienes alguna pregunta sobre cómo implementar funcionalidades específicas? ¡Déjame un comentario y continuemos la conversación!

---

**Recursos adicionales:**

- [También escribí de Jekyll en docs.jpdiaz.dev](https://docs.jpdiaz.dev/tags/jekyll/)
- [Documentación oficial de Jekyll](https://jekyllrb.com/docs/)
- [Guía de GitHub Pages](https://docs.github.com/en/pages)
- [Awesome Jekyll](https://github.com/planetjekyll/awesome-jekyll) - Una colección de recursos y plugins geniales para Jekyll
- [Free For Geeks](https://freeforgeeks.jpdiaz.dev/) - Mi proyecto open source sobre herramientas y recursos para desarrolladores
