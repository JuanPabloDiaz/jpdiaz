// Contribution Data interface
export interface ContributionData {
	url: string;
	type: 'pr' | 'issue';
	priority: number; // Lower number = higher priority for homepage display
	description?: string; // Optional custom description
	labels?: string[]; // Optional custom labels/tags
}

// For development/testing - you can replace these with your actual GitHub URLs
const mockContributions: ContributionData[] = [
	{
		url: 'https://github.com/microsoft/vscode/pull/123456',
		type: 'pr',
		priority: 1,
		description: 'Enhanced performance by implementing caching mechanism',
		labels: ['performance', 'enhancement'],
	},
	{
		url: 'https://github.com/facebook/react/issues/12345',
		type: 'issue',
		priority: 2,
		description: 'Fixed critical bug in authentication flow',
		labels: ['bug', 'authentication'],
	},
	{
		url: 'https://github.com/nodejs/node/pull/54321',
		type: 'pr',
		priority: 3,
		description: 'Added TypeScript support and improved type safety',
		labels: ['typescript', 'feature'],
	},
];

// GitHub Contribution interfaces
export interface GitHubPullRequest {
	id: number;
	number: number;
	title: string;
	html_url: string;
	state: 'open' | 'closed';
	merged_at: string | null;
	closed_at: string | null;
	created_at: string;
	updated_at: string;
	user: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
	base: {
		repo: {
			name: string;
			full_name: string;
			html_url: string;
			owner: {
				login: string;
				avatar_url: string;
				html_url: string;
			};
		};
	};
	labels: Array<{
		id: number;
		name: string;
		color: string;
	}>;
	body: string | null;
}

export interface GitHubIssue {
	id: number;
	number: number;
	title: string;
	html_url: string;
	state: 'open' | 'closed';
	closed_at: string | null;
	created_at: string;
	updated_at: string;
	user: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
	repository: {
		name: string;
		full_name: string;
		html_url: string;
		owner: {
			login: string;
			avatar_url: string;
			html_url: string;
		};
	};
	labels: Array<{
		id: number;
		name: string;
		color: string;
	}>;
	body: string | null;
}

export interface ProcessedContribution {
	id: number;
	title: string;
	url: string;
	repoName: string;
	repoFullName: string;
	repoUrl: string;
	type: 'pr' | 'issue';
	state: 'open' | 'closed' | 'merged';
	dateCompleted: string | null;
	dateCreated: string;
	labels: string[];
	description?: string;
	customLabels?: string[];
}

// Helper function to extract PR/Issue details from GitHub URL
export function extractGitHubDetails(
	url: string
): { owner: string; repo: string; number: number; type: 'pr' | 'issue' } | null {
	const prMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
	if (prMatch) {
		return {
			owner: prMatch[1],
			repo: prMatch[2],
			number: parseInt(prMatch[3]),
			type: 'pr',
		};
	}

	const issueMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/);
	if (issueMatch) {
		return {
			owner: issueMatch[1],
			repo: issueMatch[2],
			number: parseInt(issueMatch[3]),
			type: 'issue',
		};
	}

	return null;
}

// Helper function for authenticated GitHub API requests
async function githubRequest<T>(endpoint: string): Promise<T> {
	const githubToken = import.meta.env.PUBLIC_GITHUB_TOKEN;

	if (!githubToken) {
		throw new Error(
			'GitHub token not found. Please set PUBLIC_GITHUB_TOKEN in your environment variables.'
		);
	}

	const response = await fetch(`https://api.github.com${endpoint}`, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `token ${githubToken}`,
		},
	});

	if (!response.ok) {
		throw new Error(`GitHub API responded with status code: ${response.status}`);
	}

	return response.json();
}

// Function to fetch PR data from GitHub API
export async function fetchPullRequest(
	owner: string,
	repo: string,
	number: number
): Promise<GitHubPullRequest> {
	return githubRequest<GitHubPullRequest>(`/repos/${owner}/${repo}/pulls/${number}`);
}

// Function to fetch issue data from GitHub API
export async function fetchIssue(
	owner: string,
	repo: string,
	number: number
): Promise<GitHubIssue> {
	const issue = await githubRequest<GitHubIssue>(`/repos/${owner}/${repo}/issues/${number}`);

	// Add repository info since the API doesn't include it
	const repoData = await githubRequest<any>(`/repos/${owner}/${repo}`);
	return {
		...issue,
		repository: {
			name: repoData.name,
			full_name: repoData.full_name,
			html_url: repoData.html_url,
			owner: repoData.owner,
		},
	};
}

// Function to process and normalize contribution data
export function processContribution(
	data: GitHubPullRequest | GitHubIssue,
	type: 'pr' | 'issue',
	customDescription?: string,
	customLabels?: string[]
): ProcessedContribution {
	const isPR = type === 'pr';
	const pr = data as GitHubPullRequest;
	const issue = data as GitHubIssue;

	const repoInfo = isPR ? pr.base.repo : issue.repository;
	const state = isPR ? (pr.merged_at ? 'merged' : pr.state) : issue.state;

	const dateCompleted = isPR ? pr.merged_at || pr.closed_at : issue.closed_at;

	return {
		id: data.id,
		title: data.title,
		url: data.html_url,
		repoName: repoInfo.name,
		repoFullName: repoInfo.full_name,
		repoUrl: repoInfo.html_url,
		type,
		state,
		dateCompleted,
		dateCreated: data.created_at,
		labels: data.labels.map((label) => label.name),
		description: customDescription,
		customLabels,
	};
}

// Main function to fetch and process a contribution
export async function fetchContribution(
	url: string,
	customDescription?: string,
	customLabels?: string[]
): Promise<ProcessedContribution | null> {
	try {
		const details = extractGitHubDetails(url);
		if (!details) {
			console.error(`Invalid GitHub URL: ${url}`);
			return null;
		}

		const { owner, repo, number, type } = details;

		if (type === 'pr') {
			const prData = await fetchPullRequest(owner, repo, number);
			return processContribution(prData, 'pr', customDescription, customLabels);
		} else {
			const issueData = await fetchIssue(owner, repo, number);
			return processContribution(issueData, 'issue', customDescription, customLabels);
		}
	} catch (error) {
		console.error(`Error fetching contribution from ${url}:`, error);
		return null;
	}
}

// Get contributions sorted by priority
export async function getTopContributions(maxItems?: number): Promise<ProcessedContribution[]> {
	const contributionPromises = mockContributions
		.sort((a: ContributionData, b: ContributionData) => a.priority - b.priority)
		.slice(0, maxItems)
		.map(async (item: ContributionData) => {
			const contribution = await fetchContribution(item.url, item.description, item.labels);
			return contribution;
		});

	const contributions = (await Promise.all(contributionPromises)).filter(
		Boolean
	) as ProcessedContribution[];

	return contributions;
}
