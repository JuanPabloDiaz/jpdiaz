// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const site = {
	title: 'Juan Diaz', // required
	favicon: '/favicon.svg', // required
	description: 'Welcome to my Portfolio website! ',
	author: 'Juan Diaz', // required
	avatar: '/avatar.png', // required
	url: 'https://jpdiaz.vercel.app/', // required
	baseUrl: '', // When using GitHubPages, you must enter the repository name startWith '/'. e.g. '/astro-blog'
	motto: 'Actions speak louder than words.',
	githubUsername: 'JuanPabloDiaz',
	aboutMePageDescription:
		'Committed Front End developer seeking opportunities in growth-oriented startups. Upholds values of discipline, loyalty, and reliability, with a self-motivated approach to continuous learning and skill enhancement',
};

export const SITE_DESCRIPTION =
	'Juan Diaz is a web developer based in Charlotte, NC. He specializes in building (and occasionally designing) exceptional websites.';
export const GENERATE_SLUG_FROM_TITLE = true;
export const TRANSITION_API = true;

export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const SKILL_ICON_BASE_URL = 'https://go-skill-icons.vercel.app/api/icons?i=';

export const backHomeMenu = [
	{
		title: '', // Intentionally blank, assuming Navbar handles this as an icon or specific style
		path: '/',
	},
];

export const homePageMenu = [
	{ title: 'About', path: '#top' },
	{ title: 'Projects', path: '#projects' },
	{ title: 'Open-Source', path: '#oss' },
	{ title: 'Blog', path: '/blog' },
	{ title: 'Contact', path: '#contact' },
];

export const config = {
	lang: 'en', // en | es
};

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
