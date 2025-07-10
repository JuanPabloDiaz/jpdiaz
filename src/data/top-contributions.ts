export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number; // Lower number = higher priority for homepage display
	description?: string; // Optional custom description
	labels?: string[]; // Optional custom labels/tags
}

export const topContributions: ContributionData[] = [
	{
		url: 'https://github.com/microsoft/vscode/pull/123456',
		type: 'pr',
		priority: 1,
		description: 'Enhanced performance by implementing caching mechanism',
		labels: ['performance', 'enhancement']
	},
	{
		url: 'https://github.com/vercel/next.js/issues/45678',
		type: 'issue',
		priority: 2,
		description: 'Fixed critical bug in authentication flow',
		labels: ['bug', 'authentication']
	},
	{
		url: 'https://github.com/facebook/react/pull/78910',
		type: 'pr',
		priority: 3,
		description: 'Added TypeScript support and improved type safety',
		labels: ['typescript', 'feature']
	},
	{
		url: 'https://github.com/nodejs/node/pull/11223',
		type: 'pr',
		priority: 4,
		description: 'Improved documentation for async/await patterns',
		labels: ['documentation', 'async']
	},
	{
		url: 'https://github.com/astro-build/astro/issues/33445',
		type: 'issue',
		priority: 5,
		description: 'Reported and helped fix SSR hydration issue',
		labels: ['ssr', 'hydration', 'bug']
	},
	// Replace these URLs with your actual GitHub contributions
	// You can add more contributions here...
];
