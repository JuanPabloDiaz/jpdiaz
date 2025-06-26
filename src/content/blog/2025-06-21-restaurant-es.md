---
title: 'Obtención de Datos en Next.js: La Analogía del Restaurante 🍽️'
description: 'Una analogía para entender los diferentes métodos de obtención de datos en Next.js.'
pubDate: 2025-06-21
lang: 'es'
tags:
  - Next.js
  - Obtención de Datos
draft: false
---

Imagina tres restaurantes diferentes. Cada uno sirve comida de una manera única, justo como Next.js obtiene datos para tu sitio web. ¡Hagámoslo súper simple!

## 🥪 Restaurante #1: getStaticProps

**"La Tienda de Sándwiches Pre-hechos"**

El cocinero llega temprano y prepara 100 sándwiches. Todos están listos en la vitrina.

Entras y dices, "¡Quiero un sándwich de jamón!" El cajero te lo entrega al instante. **¡Súper rápido!** Pero si no te gusta la mayonesa, estás atado a lo que ya está hecho. Los sándwiches nuevos solo llegan al día siguiente.

**Perfecto para:** Sitios web simples, como blogs o menús que no cambian mucho.

**Ejemplo:** Una entrada de blog que no cambia con frecuencia.

```javascript
export async function getStaticProps() {
	const data = { title: 'Mi Entrada de Blog' }; // Datos pre-hechos
	return { props: { data } };
}
```

## 🍳 Restaurante #2: getServerSideProps

**"El Comedor a Pedido"**

Te sientas y le dices al cocinero, "¡Quiero huevos, sin queso, y usa tomates frescos!" El cocinero prepara tu comida exactamente como la quieres. Tarda unos minutos, pero es perfecta para _ti_.

**Perfecto para:** Páginas que necesitan ser diferentes para cada persona, como tu perfil de usuario o un feed de noticias.

**Ejemplo:** Una página de perfil que muestra tu nombre.

```javascript
export async function getServerSideProps({ params }) {
	const user = { name: params.username }; // Datos personalizados
	return { props: { user } };
}
```

## 🥡 Restaurante #3: Obtención del Lado del Cliente

**"El Kit de Comida para Llevar"**

Entras y el restaurante te entrega una caja con ingredientes crudos y una receta. "¡Toma, ve a casa y cocina esto tú mismo!"

Recibes la caja de inmediato (¡rápido!), pero tienes que ir a casa y cocinar. Además, si alguien le pregunta a Google "¿qué hay de almuerzo en este restaurante?", Google no puede responder, así que no es ideal para resultados de búsqueda.

**Perfecto para:** Notificaciones de usuarios, comentarios que se cargan al hacer clic en algo, funciones interactivas.

**Ejemplo:** Cargar nuevos comentarios al actualizar una página.

```javascript
useEffect(() => {
	fetch('/api/comments')
		.then((res) => res.json())
		.then(setComments);
}, []);
```

---

## La Regla Simple:

- **¿Rápido y no cambia mucho?** → Sándwiches pre-hechos (getStaticProps)
- **¿Personalizado y fresco?** → A pedido (getServerSideProps)
- **¿Interactivo y puede esperar un poco?** → Kit de comida para llevar (Obtención del Lado del Cliente)

¡La mayoría de los sitios web usan los tres, como un restaurante con bebidas pre-hechas, comidas personalizadas y postres para llevar!
