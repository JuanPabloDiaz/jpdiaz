export interface ProcessedContribution {
	title: string; // Subject of the PR/Issue
	url: string;
	repoUrl: string;
	repoFullName: string;
	type: 'pr' | 'issue';
	state: 'merged' | 'closed' | 'open';
	dateCompleted?: string;
	description?: string;
	labels: string[];
	customLabels?: string[];
	language?: string; // Primary language of the contribution
}

export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number;
	description?: string;
	labels?: string[];
	language?: string; // Add language field
	title?: string; // Add custom title field
	dateCompleted?: string; // Add date field
	top?: boolean; // True if this should be displayed on the main page
}

// Helper function to convert ContributionData to ProcessedContribution
export function processContributions(contributions: ContributionData[]): ProcessedContribution[] {
	return contributions.map((contrib) => {
		const urlParts = contrib.url.split('/');
		const owner = urlParts[3];
		const repo = urlParts[4];

		return {
			title: contrib.title || `${contrib.type === 'pr' ? 'Pull Request' : 'Issue'} in ${repo}`,
			url: contrib.url,
			repoUrl: `https://github.com/${owner}/${repo}`,
			repoFullName: `${owner}/${repo}`,
			type: contrib.type,
			state: contrib.type === 'pr' ? 'merged' : 'closed', // Mock state
			dateCompleted: contrib.dateCompleted || new Date().toISOString(),
			description: contrib.description || '',
			labels: contrib.labels || [],
			customLabels: contrib.labels,
			language: contrib.language || 'JavaScript',
		};
	});
}
