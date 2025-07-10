export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number; // Lower number = higher priority for homepage display
	description?: string; // Optional custom description
	labels?: string[]; // Optional custom labels/tags
	language?: string; // Programming language
	title?: string; // Custom title for the contribution
	dateCompleted?: string; // Date when the contribution was completed
	top?: boolean; // True if this should be displayed on the main page (top 3)
}

export const topContributions: ContributionData[] = [
	{
		url: 'https://github.com/tech-conferences/conference-data/pull/12345',
		type: 'pr',
		priority: 1,
		title: 'Add 2024 Latin America tech conferences data',
		description: 'Added comprehensive conference data for 2024 tech events across Latin America',
		labels: ['data', 'conferences', 'enhancement'],
		language: 'JSON',
		dateCompleted: '2024-03-15',
		top: true,
	},
	{
		url: 'https://github.com/marcelscruz/public-apis/pull/67890',
		type: 'pr',
		priority: 2,
		title: 'Add Weather and Crypto APIs with improved docs',
		description:
			'Contributed new APIs and improved documentation structure for better developer experience',
		labels: ['api', 'documentation', 'feature'],
		language: 'Markdown',
		dateCompleted: '2024-02-28',
		top: true,
	},
	{
		url: 'https://github.com/marcelscruz/dev-resources/pull/11223',
		type: 'pr',
		priority: 3,
		title: 'Add React and Vue.js learning resources section',
		description: 'Added new developer resources and tools section for modern frontend frameworks',
		labels: ['resources', 'tools', 'enhancement'],
		language: 'TypeScript',
		dateCompleted: '2024-01-20',
		top: true,
	},
	{
		url: 'https://github.com/astro-build/astro/issues/33445',
		type: 'issue',
		priority: 4,
		title: 'SSR hydration mismatch in dynamic components',
		description:
			'Reported and helped fix SSR hydration issue affecting dynamic component rendering',
		labels: ['ssr', 'hydration', 'bug'],
		language: 'JavaScript',
		dateCompleted: '2023-12-10',
		top: false,
	},
	{
		url: 'https://github.com/vercel/next.js/pull/44556',
		type: 'pr',
		priority: 5,
		title: 'Improve TypeScript integration for App Router',
		description: 'Enhanced TypeScript integration and developer experience for the new App Router',
		labels: ['typescript', 'dx', 'feature'],
		language: 'TypeScript',
		dateCompleted: '2023-11-25',
		top: false,
	},
	{
		url: 'https://github.com/facebook/react/issue/77889',
		type: 'issue',
		priority: 6,
		title: 'Performance bottleneck in useEffect cleanup',
		description: 'Identified performance bottleneck in component rendering during effect cleanup',
		labels: ['performance', 'react', 'bug'],
		language: 'JavaScript',
		dateCompleted: '2023-10-15',
		top: false,
	},
	// Add more contributions as needed...
];
