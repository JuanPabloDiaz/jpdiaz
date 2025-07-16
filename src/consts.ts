export const site = {
	author: 'Juan Díaz',
	description:
		'Juan Díaz is a web developer based in Charlotte, NC. He specializes in building (and occasionally designing) exceptional websites.',
	url: 'https://jpdiaz.dev/',
	motto: 'Actions speak louder than words.',
	githubUsername: 'JuanPabloDiaz',
	defaultOgImage: '/placeholder-og-image.jpg',
	keywords: [
		'Juan Pablo Diaz developer',
		'Full stack developer',
		'React developer',
		'JavaScript developer',
		'Frontend developer',
		'Backend developer',
		'Web developer portfolio',
	],
	aboutMePageDescription:
		'Committed Full Stack Developer advancing into Data Engineering, seeking opportunities with innovative teams. From 🇨🇴 in 🇺🇸, driven by continuous learning and passionate about building powerful solutions.',
};

export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const SKILL_ICON_BASE_URL = 'https://go-skill-icons.vercel.app/api/icons?i=';

export const backHomeMenu = [
	{
		title: '', // Intentionally blank, Navbar handles this as an icon or specific style
		path: '/',
	},
];

export const homePageMenu = [
	{ title: 'About', path: '#top' },
	{ title: 'Projects', path: '#projects' },
	{ title: 'Open-Source', path: '#oss' },
	{ title: 'Testimonials', path: '#testimonials' },
	{ title: 'Blog', path: '/blog' },
	{ title: 'Contact', path: '#contact' },
];

export const config = {
	lang: 'en', // en | es
};

export const whatImDoing = [
	{
		role: 'Founder & Full Stack Developer @',
		url: 'https://talentoparati.netlify.app',
		repo: '#',
		title: 'Talento Para TI',
		date: 'June 2024.',
	},
	{
		role: 'Open-Source Maintainer @',
		url: 'https://confs.tech/pages/team',
		repo: 'https://github.com/tech-conferences/conference-data/graphs/contributors',
		title: 'Confs.tech',
		date: 'April 2024.',
	},
	{
		role: 'Open-Source Maintainer @',
		url: 'https://publicapis.dev',
		repo: 'https://github.com/marcelscruz/public-apis/graphs/contributors',
		title: 'Public APIs',
		date: 'July 2024.',
	},
	{
		role: 'Open-Source Maintainer @',
		url: 'https://devresourc.es',
		repo: 'https://github.com/marcelscruz/dev-resources/graphs/contributors',
		title: 'Dev Resources',
		date: 'July 2024.',
	},
];

export const social = [
	{
		href: 'https://github.com/juanpablodiaz',
		ariaLabel: 'github',
		iconName: 'simple-icons:github',
	},
	{
		href: 'https://linkedin.com/in/1diazdev',
		ariaLabel: 'linkedin',
		iconName: 'simple-icons:linkedin',
	},
	{
		href: 'https://twitter.com/JuanDiaz_427',
		ariaLabel: 'twitter',
		iconName: 'simple-icons:twitter',
	},
	// {
	// 	href: 'https://platzi.com/p/1diazdev/',
	// 	ariaLabel: 'platzi',
	// 	iconName: 'simple-icons:platzi',
	// },
];

export const skills = [
	{ name: 'React' },
	{ name: 'Next.js' },
	{ name: 'Astro' },
	{ name: 'Nuxt.js' },
	{ name: 'JavaScript' },
	{ name: 'TypeScript' },
	{ name: 'Tailwind CSS' },
	{ name: 'Git' },
	{ name: 'Python' },
	{ name: 'SQL' },
	{ name: 'Spark' },
	{ name: 'AWS' },
	{ name: 'Node.js' },
	{ name: 'Express.js' },
	{ name: 'MongoDB' },
	{ name: 'Jekyll' },
	{ name: 'n8n' },
	{ name: 'REST APIs' },
	{ name: 'HTML' },
	{ name: 'CSS' },
];

export const resumeProjects = [
	{
		url: 'https://freeforgeeks.jpdiaz.dev',
		label: 'FreeForGeeks',
		description:
			'Curated toolbox for building better software. Free resources for all your dev needs.',
	},
	{
		url: 'https://repos.jpdiaz.dev',
		label: 'Repos',
		description: 'A collection of over 50+ open source projects that are public on my GitHub repo',
	},
	{
		url: 'https://books.jpdiaz.dev',
		label: 'Book Store',
		description: 'A Full Stack Book Store web app using MERN stack.',
	},
	{
		url: 'https://fit.jpdiaz.dev',
		label: 'Fitness Matrix',
		description:
			'A cutting-edge web application that revolutionizes how you visualize and analyze your fitness data. By seamlessly integrating Strava and Hevy APIs.',
	},
	{
		url: 'https://colombia.jpdiaz.dev',
		label: 'Colombia 360',
		description:
			'An interactive web app exploring Colombia via maps, media, and data from api-colombia.com.',
	},
	{
		url: 'https://fav.jpdiaz.dev',
		label: 'Juan\'s Favorites',
		description:
			'A curated collection of my favorite Books, movies, TV shows, Games, artists and podcasts.',
	},
	{
		url: 'https://jpdiaz.dev',
		label: 'Jpdiaz.dev',
		description: 'Personal website with portfolio showcase, blog, and professional testimonials.',
	},
	{
		url: 'https://docs.jpdiaz.dev',
		label: 'Docs.jpdiaz.dev',
		description:
			'Delves into the intricacies of my projects, detailing the technologies used, development processes, and challenges tackled. It is a testament to continuous learning and skill development.',
	},
	{
		url: 'https://juanpablodiaz.github.io/freecodecamp_certifications',
		label: 'FreeCodeCamp Certification Projects',
		description: 'Contains all the projects I have completed to earn freeCodeCamp certifications.',
	},
	{
		url: 'https://juanpablodiaz.github.io/freecodecamp_certifications',
		label: 'FreeCodeCamp Collection',
		description:
			'Has all the projects I built to earn these certifications: Legacy Front End, Front End Dev Libraries, and Responsive Web Design',
	},
	{
		url: 'https://follow.jpdiaz.dev',
		label: 'Follow.jpdiaz.dev',
		description:
			'Custom link management solution as Linktree alternative. A simple and clean way to display links.',
	},
];

export const resumeCertifications = [
	{
		url: 'https://credentials.databricks.com/3428c69a-03d0-4598-8429-55786b9d8ddd#acc.G6QlY0p3',
		title: 'Databricks MVP',
		year: '2025',
	},
	{
		url: 'https://credentials.databricks.com/7c7d153e-2986-4fb1-a38e-5b14e9b71365#acc.U5feJdOb',
		title: 'Generative AI Fundamentals',
		year: '2025',
	},
	{
		url: 'https://credentials.databricks.com/f11020d3-09ad-47a5-a9a4-06b4ef5f9980#acc.Poi85KdA',
		title: 'Databricks Fundamentals',
		year: '2025',
	},
	{
		url: 'https://www.freecodecamp.org/certification/1diazdev/javascript-algorithms-and-data-structures',
		title: 'Legacy JavaScript',
		year: '2025',
	},
	{
		url: 'https://www.freecodecamp.org/certification/1diazdev/javascript-algorithms-and-data-structures-v8',
		title: 'JavaScript and Data Structures',
		year: '2025',
	},
	{
		url: 'https://www.freecodecamp.org/certification/1diazdev/scientific-computing-with-python-v7',
		title: 'Scientific Computing with Python',
		year: '2025',
	},
	{
		url: 'https://www.freecodecamp.org/certification/1diazdev/legacy-front-end',
		title: 'Legacy Front End',
		year: '2024',
	},
	{
		url: 'https://freecodecamp.org/certification/1diazdev/front-end-development-libraries',
		title: 'Front End Development Libraries',
		year: '2023',
	},
	{
		url: 'https://freecodecamp.org/certification/1diazdev/responsive-web-design',
		title: 'Responsive Web Design',
		year: '2022',
	},
	{
		url: 'https://platzi.com/p/1diazdev/ruta/8350-cloud-servidores/diploma/detalle/',
		title: 'Server Management',
		year: '2022',
	},
	{
		url: 'https://platzi.com/p/1diazdev/ruta/8422-cloud-digital-leader/diploma/detalle/',
		title: 'Cloud Digital Leader',
		year: '2022',
	},
	{
		url: './certification/IT-AplicationSoftwareFundamentals.jpg',
		title: 'IT in Application Software Fundamentals',
		year: '2020',
		isWide: false,
	},
];

export const resumeCourses = [
	{
		url: 'https://platzi.com/p/1diazdev',
		title: 'Multiple courses at Platzi.com',
	},
	{
		url: 'https://platzi.com/p/1diazdev/curso/7396-course/diploma/detalle/',
		title: 'React course with Vite.js & Tailwind CSS',
	},
	{
		url: 'https://platzi.com/p/1diazdev/curso/6867-sass/diploma/detalle/',
		title: 'Learn Sass: Fundamentals!',
	},
	{
		url: 'https://platzi.com/p/1diazdev/curso/6207-astro/diploma/detalle/',
		title: 'Build a website with Astro',
	},
	{
		url: 'https://platzi.com/p/1diazdev/curso/7758-web-chatgpt/diploma/detalle/',
		title: 'Build a website with ChatGPT',
	},
	{
		url: 'https://platzi.com/p/1diazdev/curso/3215-new-relic/diploma/detalle/',
		title: 'Learn Observability: Fundamentals!',
	},
];

export const resumePageMenu = [
	{
		title: 'Profile',
		path: '#top',
	},
	{
		title: 'Education',
		path: '#education',
	},
	{
		title: 'Experience',
		path: '#experience',
	},
];

export const CERTIFICATION_IMAGES = [
	{
		src: '/certification/IT-AplicationSoftwareFundamentals.jpg',
		label: 'CPCC',
	},
	{
		src: '/certification/IT-WebTechnologies(AAS).jpg',
		label: 'Web Technologies (AAS)',
	},
];
