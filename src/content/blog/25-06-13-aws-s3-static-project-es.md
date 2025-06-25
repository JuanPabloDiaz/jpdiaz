---
title: 'Alojamiento de un sitio web estático en AWS: Una guía para principiantes'
description: 'Una guía paso a paso para desplegar un sitio web estático usando servicios de AWS.'
pubDate: 2025-06-13
lang: 'es'
tags:
  - AWS
  - S3
# image: '/blog-cover/life/run-finish.jpeg'
draft: false
---

Estoy muy emocionado de compartir un proyecto genial de AWS en el que he estado trabajando. Hoy, vamos a sumergirnos en cómo desplegar un sitio web estático (HTML, CSS y JavaScript) usando **Amazon S3**, **CloudFront** y **Route 53**. Esta guía es para desarrolladores junior y personas curiosas que quieren aprender AWS de una manera divertida y práctica. Creo que enseñar es la mejor manera de aprender, así que vamos a desglosarlo paso a paso, sin detalles abrumadores, solo el panorama general para que puedas empezar.

**Arquitectura de proyectos:**
![arquitectura de proyectos](/src/assets/images/blog/aws/aws-s3.svg)

## ¿Porqué este proyecto?

Esta configuración es perfecta para alojar un portafolio, blog o un pequeño proyecto, ofreciendo un dominio personalizado, HTTPS seguro y una entrega global ultrarrápida. Es una forma ideal de explorar AWS sin perderse en los detalles. Estoy usando una página de inicio simple `index.html` (que enlaza mis perfiles) como una alternativa a Linktree: una forma limpia y efectiva de gestionar tus enlaces. ¿Listo? ¡Vamos!

## Lo que necesitarás

- Un nombre de dominio (por ejemplo, [follow.jpdiaz.dev](https://follow.jpdiaz.dev)) de un registrador como GoDaddy o Namecheap.
- Una cuenta de AWS (el nivel gratuito funciona para la mayor parte de esto).
- Un sitio web estático (HTML, CSS, JS).

## Paso 1: Almacena tu sitio web en S3

**Amazon S3** es como una caja de almacenamiento en la nube confiable para los archivos de tu sitio web; piénsalo como una **carpeta súper económica y escalable en la nube** para literalmente cualquier cosa que quieras.

- **Crea un bucket de S3**: En la consola de S3, crea un bucket con el mismo nombre exacto de tu dominio (por ejemplo, `follow.jpdiaz.dev`).
- **Sube archivos**: Agrega tus archivos `index.html`, CSS y JS. Asegúrate de que tu página principal sea `index.html`; es el nombre de página web predeterminado.
- **Mantente seguro**: Mantendremos el bucket privado y usaremos CloudFront para entregar contenido de forma segura (más sobre esto pronto).

Eso es todo para S3: ¡tus archivos ya están en la nube!

## Paso 2: Protege tu dominio con un certificado SSL

Para que tu sitio sea seguro con HTTPS, usaremos **AWS Certificate Manager (ACM)** para un certificado SSL gratuito.

- **Solicita un certificado**: En la consola de ACM, selecciona la región **us-east-1 (Norte de Virginia)** (CloudFront requiere esto).
- **Agrega tu dominio**: Introduce `follow.jpdiaz.dev`. Puedes agregar un comodín (por ejemplo, `*.follow.jpdiaz.dev`) para subdominios.
- **Valida la propiedad**: Elige la validación DNS. AWS proporcionará un registro para agregar a la configuración DNS de tu dominio (haremos esto en Route 53).

Una vez validado, tu certificado SSL estará listo para proteger tu sitio.

## Paso 3: Configura CloudFront para la velocidad

**CloudFront** es la Red de Entrega de Contenido (CDN) de AWS, que hace que tu sitio cargue rápido en todo el mundo.

- **Crea una distribución**: En CloudFront, selecciona tu bucket de S3 como el "origen" (fuente de archivos).
- **Acceso seguro**: Usa **Control de Acceso de Origen (OAC)** para que solo CloudFront pueda acceder a tu bucket de S3.
- **Agrega SSL**: Elige el certificado ACM que creaste.
- **Establece valores predeterminados**: Haz de `index.html` el objeto raíz predeterminado y habilita la redirección de HTTP a HTTPS.
- **Optimiza el almacenamiento en caché**: Usa la política "CachingOptimized" para tiempos de carga más rápidos.

Copia la política de bucket de CloudFront y agrégala a los permisos de tu bucket de S3. El despliegue tarda unos minutos.

## Paso 4: Conecta tu dominio con Route 53

**Route 53** gestiona el DNS para vincular tu dominio a CloudFront.

- **Crea una zona alojada**: En Route 53, crea una zona alojada pública para `follow.jpdiaz.dev`. Obtendrás registros NS (servidor de nombres) y SOA (inicio de autoridad).
- **Valida el certificado**: Agrega el registro de validación DNS del Paso 2 a tu zona alojada. La validación es rápida.
- **Mapea a CloudFront**: Crea un **registro A** con la opción "Alias" apuntando a tu distribución de CloudFront.

Actualiza los servidores de nombres de tu registrador de dominio para usar los registros NS de Route 53.

## Paso 5: ¡Pruébalo!

Una vez que CloudFront esté desplegado (verifica la consola), visita `follow.jpdiaz.dev`. ¡Tu sitio debería cargar con HTTPS! Haz clic para probar los enlaces. También puedes probar la URL de CloudFront, pero tu dominio personalizado es la estrella.

## Por qué esto es genial

Esta configuración es simple, segura y rápida:

- **Segura**: S3 privado + HTTPS a través de CloudFront y ACM.
- **Rápida**: Ubicaciones de borde globales de CloudFront.
- **Escalable**: Maneja picos de tráfico fácilmente.
- **Asequible**: Ideal para proyectos pequeños.

## Lo que aprendí

Los servicios de AWS encajan como un rompecabezas: S3 almacena, CloudFront distribuye y Route 53 conecta. ¿La clave? Los certificados de CloudFront deben estar en `us-east-1`. Una vez que dominas eso, todo va sobre ruedas.

## ¿Qué sigue?

Intenta agregar:

- AWS WAF para seguridad adicional.
- CloudWatch para obtener información sobre el rendimiento.
- Pipelines de CI/CD para actualizaciones automáticas.

¡Me divertí muchísimo construyendo esto, y espero que despierte tu curiosidad para probar AWS! Conectemos en [Linkedin](https://www.linkedin.com/in/1diazdev). ¡Me encantaría saber si prefieres esta pila de S3/CloudFront/Route 53 o AWS Amplify para tus proyectos!
