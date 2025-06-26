---
title: 'Next.js Data Fetching: The Restaurant Analogy 🍽️'
description: 'An analogy to understand different data fetching methods in Next.js.'
pubDate: 2025-06-21
lang: 'en'
tags:
  - Next.js
  - Data Fetching
draft: false
---

Imagine three different restaurants. Each one serves food in a unique way, just like Next.js gets data for your website. Let’s make it super simple!

## 🥪 Restaurant #1: getStaticProps

**"The Pre-Made Sandwich Shop"**

The cook arrives early and makes 100 sandwiches. They’re all ready in the display case.

You walk in and say, "I want a ham sandwich!" The cashier grabs one instantly. **Super fast!** But if you don’t like mayo, you’re stuck with what’s already made. New sandwiches only come the next day.

**Perfect for:** Simple websites, like blogs or menus that stay the same for a while.

**Example:** A blog post that doesn’t change often.

```javascript
export async function getStaticProps() {
	const data = { title: 'My Blog Post' }; // Pre-made data
	return { props: { data } };
}
```

## 🍳 Restaurant #2: getServerSideProps

**"The Made-to-Order Diner"**

You sit down and tell the cook, "I want eggs, no cheese, and use fresh tomatoes!" The cook makes your meal exactly how you want it. It takes a few minutes, but it’s perfect for _you_.

**Perfect for:** Pages that need to be different for each person, like your user profile or a news feed.

**Example:** A profile page showing your name.

```javascript
export async function getServerSideProps({ params }) {
	const user = { name: params.username }; // Custom data
	return { props: { user } };
}
```

## 🥡 Restaurant #3: Client-Side Fetching

**"The Take-Home Meal Kit"**

You walk in and the restaurant hands you a box with raw ingredients and a recipe. "Here, go home and cook this yourself!"

You get the box immediately (fast!), but now you have to go home and cook it. Also, if someone asks Google "what's for lunch at this restaurant?", Google can't answer, so it’s not great for search results.

**Perfect for:** User notifications, comments that load after you click something, interactive features.

**Example:** Loading new comments when you refresh a page.

```javascript
useEffect(() => {
	fetch('/api/comments')
		.then((res) => res.json())
		.then(setComments);
}, []);
```

---

## The Simple Rule:

- **Fast and doesn’t change much?** → Pre-made sandwiches (getStaticProps)
- **Personalized and fresh?** → Made-to-order (getServerSideProps)
- **Interactive and can wait a bit?** → Instant meal kit (Client-Side Fetching)

Most websites use all three, like a restaurant with pre-made drinks, custom meals, and take-home desserts!
