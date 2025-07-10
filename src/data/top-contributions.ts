export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number; // Lower number = higher priority for homepage display
	description?: string; // Optional custom description
	labels?: string[]; // Optional custom labels/tags
}

export const topContributions: ContributionData[] = [
	{
		url: 'https://github.com/tech-conferences/conference-data/pull/12345',
		type: 'pr',
		priority: 1,
		description: 'Added comprehensive conference data for 2024 tech events',
		labels: ['data', 'conferences', 'enhancement'],
	},
	{
		url: 'https://github.com/marcelscruz/public-apis/pull/67890',
		type: 'pr',
		priority: 2,
		description: 'Contributed new APIs and improved documentation structure',
		labels: ['api', 'documentation', 'feature'],
	},
	{
		url: 'https://github.com/marcelscruz/dev-resources/pull/11223',
		type: 'pr',
		priority: 3,
		description: 'Added new developer resources and tools section',
		labels: ['resources', 'tools', 'enhancement'],
	},

	// Add more contributions as needed...
];
