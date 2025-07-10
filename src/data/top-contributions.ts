export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number; // Lower number = higher priority for homepage display
	description?: string; // Optional custom description
	language?: string; // Programming language
	title?: string; // Custom title for the contribution
	dateCompleted?: string; // Date when the contribution was completed
	top?: boolean; // True if this should be displayed on the main page (top 3)
}

export const topContributions: ContributionData[] = [
	{
		url: 'https://github.com/tech-conferences/confs.tech/pull/632',
		type: 'pr',
		priority: 1,
		title: 'Add Team page to Confs.tech',
		description:
			'Adds a new Team page with Maintainers and Contributors sections, styled and fetching data from GitHub API with local fallback.',
		language: 'Typescript',
		dateCompleted: '2024-06-14',
		top: true,
	},
	{
		url: 'https://github.com/tech-conferences/confs.tech/pull/1021',
		type: 'pr',
		priority: 2,
		title: '6 PRs merged to improve and update the project',
		description:
			'Improves build performance, modernizes dependencies, adds cookie consent, enhances security headers, and updates key components for privacy and UX.',
		language: 'Typescript',
		dateCompleted: '2025-07-07',
		top: true,
	},
	{
		url: 'https://github.com/tech-conferences/confs.tech/pull/761',
		type: 'pr',
		priority: 3,
		title: 'Add Date Range Filter to Conference List UI',
		description:
			'Adds date range filtering to the conference list, with styling and UX improvements using react-datepicker, plus minor layout and code tweaks.',
		language: 'Typescript',
		dateCompleted: '2025-07-09',
		top: true,
	},
];
