export interface ProcessedContribution {
	title: string;
	url: string;
	repoUrl: string;
	repoFullName: string;
	type: 'pr' | 'issue';
	state: 'merged' | 'closed' | 'open';
	dateCompleted?: string;
	description?: string;
	labels: string[];
	customLabels?: string[];
}

export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number;
	description?: string;
	labels?: string[];
}

// Helper function to convert ContributionData to ProcessedContribution
export function processContributions(contributions: ContributionData[]): ProcessedContribution[] {
	return contributions.map(contrib => {
		const urlParts = contrib.url.split('/');
		const owner = urlParts[3];
		const repo = urlParts[4];
		
		return {
			title: `${contrib.type === 'pr' ? 'Pull Request' : 'Issue'} in ${repo}`,
			url: contrib.url,
			repoUrl: `https://github.com/${owner}/${repo}`,
			repoFullName: `${owner}/${repo}`,
			type: contrib.type,
			state: contrib.type === 'pr' ? 'merged' : 'closed', // Mock state
			dateCompleted: new Date().toISOString(),
			description: contrib.description || '',
			labels: contrib.labels || [],
			customLabels: contrib.labels,
		};
	});
}
