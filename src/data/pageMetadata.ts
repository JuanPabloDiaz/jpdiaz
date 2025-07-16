// Page-specific metadata for improved SEO and social sharing
export const pageMetadata = {
	home: {
		title: 'Juan Díaz | Full Stack Developer & Data Engineer',
		description:
			'Juan Díaz is a passionate full stack developer and data engineer based in Charlotte, NC. Specializing in React, TypeScript, Python, and modern web technologies. Building exceptional digital experiences.',
		keywords: [
			'Juan Pablo Diaz developer',
			'Full stack developer Charlotte NC',
			'React developer',
			'TypeScript developer',
			'Python developer',
			'Data engineer',
			'Frontend developer',
			'Backend developer',
			'Web developer portfolio',
			'JavaScript developer',
			'Node.js developer',
		],
		ogImage: '/images/desktop-v2.png',
	},

	oss: {
		title: 'Open Source Projects | Juan Díaz',
		description:
			'Explore Juan Díaz\'s open source contributions and projects. From React components to Python tools, discover my commitment to the developer community and collaborative coding.',
		keywords: [
			'Juan Diaz open source',
			'GitHub contributions',
			'React open source',
			'JavaScript open source',
			'TypeScript open source',
			'Python open source projects',
			'Developer contributions',
			'Open source portfolio',
			'GitHub projects',
		],
		ogImage: '/images/desktop-v2-OSS.png',
	},

	resume: {
		title: 'Resume | Juan Díaz - Full Stack Developer',
		description:
			'View Juan Díaz\'s professional resume. Full stack developer with experience in React, TypeScript, Python, and data engineering. Based in Charlotte, NC and available for opportunities.',
		keywords: [
			'Juan Diaz resume',
			'Full stack developer resume',
			'React developer CV',
			'TypeScript developer resume',
			'Python developer CV',
			'Data engineer resume',
			'Charlotte NC developer',
			'Software engineer resume',
			'Frontend developer CV',
		],
		ogImage: '/images/desktop-v2-CV.png',
	},

	moreProjects: {
		title: 'More Projects | Juan Díaz Portfolio',
		description:
			'Discover additional projects by Juan Díaz. A collection of full stack applications, React components, and innovative solutions showcasing diverse technical skills and creativity.',
		keywords: [
			'Juan Diaz projects',
			'React projects',
			'TypeScript projects',
			'Full stack projects',
			'JavaScript applications',
			'Web development portfolio',
			'Python projects',
			'Developer portfolio',
			'Programming projects',
		],
		ogImage: '/images/desktop-v2.png',
	},

	testimonials: {
		title: 'Testimonials | Juan Díaz',
		description:
			'Read what colleagues, clients, and collaborators say about working with Juan Díaz. Professional testimonials highlighting technical skills, work ethic, and project success.',
		keywords: [
			'Juan Diaz testimonials',
			'Developer testimonials',
			'Client reviews',
			'Professional recommendations',
			'Full stack developer reviews',
			'React developer testimonials',
			'Charlotte NC developer reviews',
			'Software engineer recommendations',
		],
		ogImage: '/images/desktop-v2.png',
	},

	blog: {
		title: 'Blog | Juan Díaz - Tech Insights & Tutorials',
		description:
			'Read Juan Díaz\'s blog featuring technical tutorials, web development insights, programming tips, and thoughts on modern software engineering practices.',
		keywords: [
			'Juan Diaz blog',
			'Web development blog',
			'React tutorials',
			'TypeScript blog',
			'JavaScript tutorials',
			'Programming blog',
			'Frontend development',
			'Full stack tutorials',
			'Developer insights',
			'Tech blog',
		],
		ogImage: '/images/desktop-v2.png',
	},

	contact: {
		title: 'Contact | Juan Díaz',
		description:
			'Get in touch with Juan Díaz for project collaborations, job opportunities, or technical discussions. Full stack developer available for freelance and full-time positions.',
		keywords: [
			'Contact Juan Diaz',
			'Hire full stack developer',
			'React developer for hire',
			'Charlotte NC developer',
			'Freelance developer',
			'Full stack developer contact',
			'Project collaboration',
			'Developer for hire',
		],
		ogImage: '/images/desktop-v2-contact.png',
	},

	notFound: {
		title: '404 - Page Not Found | Juan Díaz',
		description:
			'Oops! The page you\'re looking for doesn\'t exist. Return to Juan Díaz\'s portfolio to explore projects, blog posts, and professional information.',
		keywords: ['404 error', 'Page not found', 'Juan Diaz portfolio', 'Developer portfolio'],
		ogImage: '/images/desktop-v2.png',
	},

	thanks: {
		title: 'Thank You! | Juan Díaz',
		description:
			'Thank you for your message! Juan Díaz will get back to you soon. Feel free to explore the portfolio while you wait.',
		keywords: ['Thank you message', 'Contact confirmation', 'Juan Diaz portfolio'],
		ogImage: '/images/desktop-v2.png',
	},

	// Spanish versions
	blogEs: {
		title: 'Blog | Juan Díaz - Perspectivas y Tutoriales de Tecnología',
		description:
			'Lee el blog de Juan Díaz con tutoriales técnicos, perspectivas sobre desarrollo web, consejos de programación y reflexiones sobre prácticas modernas de ingeniería de software.',
		keywords: [
			'Juan Diaz blog',
			'Blog desarrollo web',
			'Tutoriales React',
			'Blog TypeScript',
			'Tutoriales JavaScript',
			'Blog programación',
			'Desarrollo frontend',
			'Tutoriales full stack',
			'Perspectivas desarrollador',
			'Blog tecnología',
		],
		ogImage: '/images/desktop-v2.png',
	},
};

// Utility function to get metadata for a page
export function getPageMetadata(page: keyof typeof pageMetadata) {
	return pageMetadata[page];
}
