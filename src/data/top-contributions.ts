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
		url: 'https://github.com/tech-conferences/confs.tech/pull/761',
		type: 'pr',
		priority: 2,
		title: 'Add Date Range Filter to Conference List UI',
		description:
			'Adds date range filtering to the conference list, with styling and UX improvements using react-datepicker, plus minor layout and code tweaks.',
		language: 'Typescript',
		dateCompleted: '2025-07-09',
		top: true,
	},
	{
		url: 'https://github.com/tech-conferences/confs.tech/pull/1021',
		type: 'pr',
		priority: 3,
		title: '6 PRs merged to improve and update the project',
		description:
			'Improves build performance, modernizes dependencies, adds cookie consent, enhances security headers, and updates key components for privacy and UX.',
		language: 'Typescript',
		dateCompleted: '2025-07-07',
		top: true,
	},
	{
		url: 'https://github.com/unitycatalog/unitycatalog-ui/pull/69',
		type: 'pr',
		priority: 4,
		title: 'Add ability to edit schema description',
		description:
			'Allows users to edit the schema description directly from the UI, improving usability and accessibility.',
		language: 'Typescript',
		dateCompleted: '2024-08-22',
		top: false,
	},
	{
		url: 'https://github.com/tech-conferences/confs.tech/pull/878',
		type: 'pr',
		priority: 5,
		title: 'Update dropdown menu styles',
		description:
			'Improves dropdown menu styles for better visibility in dark mode, enhancing user experience across different themes.',
		language: 'Typescript',
		dateCompleted: '2025-01-28',
		top: false,
	},
	{
		url: 'https://github.com/marcelscruz/dev-resources/pull/861',
		type: 'pr',
		priority: 6,
		title: 'Order resources',
		description: 'Script to extract and alphabetically sort resources in .ts files.',
		language: 'Javascript',
		dateCompleted: '2025-07-02',
		top: false,
	},
	{
		url: 'https://github.com/marcelscruz/public-apis/issues/559',
		type: 'issue',
		priority: 7,
		title: 'Enhance PR review with link detection and /db edit warning',
		description:
			'Streamline PR reviews by automating two checks: detect new API links in README.md and warn against editing the auto-generated /db folder.',
		language: 'GitHub Actions',
		dateCompleted: '2025-07-11',
		top: false,
	},
	{
		url: 'https://github.com/marcelscruz/dev-resources/issues/870',
		type: 'issue',
		priority: 8,
		title: 'Automate PR comments for new resource links and auto-generated file edits',
		description:
			'Streamline PR reviews by automating two checks: detect new resource links and warn against editing the auto-generated files',
		language: 'GitHub Actions',
		dateCompleted: '2025-07-11',
		top: false,
	},
	{
		url: 'https://github.com/rupali-codes/LinksHub/pull/2538/files',
		type: 'pr',
		priority: 9,
		title: 'feat: add github action to self-assign the issue',
		description:
			'Create a GitHub workflow to self-assign issues by commenting *take*, enhancing issue management and automation.',
		language: 'GitHub Actions',
		dateCompleted: '2024-10-19',
		top: false,
	},
	{
		url: 'https://github.com/tech-conferences/conference-data/pull/7022',
		type: 'pr',
		priority: 10,
		title: 'Add Broken Link Checker',
		description:
			'Adds a broken link checker to the project, ensuring all links are valid and up-to-date.',
		language: 'GitHub Actions',
		dateCompleted: '2024-07-14',
		top: false,
	},
];
