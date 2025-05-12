const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubRepo {
	updated_at: string;
	forks_count: number;
	open_issues_count: number;
	stargazers_count: number;
	created_at: string;
	size: number; // in KB
	license?: {
		key: string;
		name: string;
		spdx_id: string;
		url: string | null;
		node_id: string;
	};
}

interface GitHubRepoData {
	lastUpdate: string;
	createdOn: string;
	size: number;
	languages: string[];
	forks: number;
	openIssues: number;
	stars: number;
	license?: {
		key: string;
		name: string;
		spdx_id: string;
		url: string | null;
		node_id: string;
	};
}

interface GitHubCommitData {
	count: number;
}

interface GitHubUserData {
	repoCount: number;
}

interface GitHubCommit {
	sha: string;
	commit: {
		author: {
			name: string;
			email: string;
			date: string;
		};
	};
}

interface GitHubContributor {
	author: {
		login: string;
	};
	total: number;
	weeks: any[];
}

// Helper function to extract owner and repo from GitHub URL
export function getRepoDetails(url: string) {
	const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
	const matches = url.match(regex);
	return matches ? { owner: matches[1], repo: matches[2] } : null;
}

// Helper function to make authenticated GitHub API requests
async function githubRequest<T>(endpoint: string): Promise<T> {
	const githubToken = import.meta.env.PUBLIC_GITHUB_TOKEN;
	const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
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

// Get repository data including stars, forks, languages, etc.
export async function getGitHubRepoData(repoUrl: string): Promise<GitHubRepoData | null> {
	try {
		const repoDetails = getRepoDetails(repoUrl);
		if (!repoDetails) return null;
		const { owner, repo } = repoDetails;

		const [repoData, languagesData] = await Promise.all([
			githubRequest<GitHubRepo>(`/repos/${owner}/${repo}`),
			githubRequest<Record<string, number>>(`/repos/${owner}/${repo}/languages`),
		]);

		return {
			lastUpdate: new Date(repoData.updated_at).toLocaleDateString(),
			createdOn: new Date(repoData.created_at).toLocaleDateString(),
			size: repoData.size,
			languages: Object.keys(languagesData),
			forks: repoData.forks_count,
			openIssues: repoData.open_issues_count,
			stars: repoData.stargazers_count,
			license: repoData.license,
		};
	} catch (error) {
		console.error('Error fetching GitHub data:', error);
		return null;
	}
}

// Get commit count for a specific author in a repository
export async function getGitHubCommits(
	repoUrl: string,
	author: string
): Promise<GitHubCommitData | null> {
	try {
		const repoDetails = getRepoDetails(repoUrl);
		if (!repoDetails) return null;
		const { owner, repo } = repoDetails;

		// First, try to get the total commit count using the statistics API
		try {
			const statsResponse = await githubRequest<GitHubContributor[]>(
				`/repos/${owner}/${repo}/stats/contributors`
			);
			if (Array.isArray(statsResponse)) {
				const authorStats = statsResponse.find((stat) => stat.author?.login === author);
				if (authorStats) {
					return {
						count: authorStats.total,
					};
				}
			}
		} catch (statsError) {
			console.warn('Could not fetch commit stats, falling back to commit list:', statsError);
		}

		// If stats API fails or author not found, fall back to paginated commits list
		let page = 1;
		let allCommits: GitHubCommit[] = [];
		let hasMore = true;
		const perPage = 100; // Maximum allowed by GitHub API

		while (hasMore) {
			const commits = await githubRequest<GitHubCommit[]>(
				`/repos/${owner}/${repo}/commits?author=${author}&per_page=${perPage}&page=${page}`
			);

			if (!Array.isArray(commits) || commits.length === 0) {
				hasMore = false;
			} else {
				allCommits = [...allCommits, ...commits];
				if (commits.length < perPage) {
					hasMore = false;
				} else {
					page++;
				}
			}
		}

		return {
			count: allCommits.length,
		};
	} catch (error) {
		console.error('Error fetching GitHub commits:', error);
		return null;
	}
}

// Get user data including repository count
export async function getGitHubUserData(username: string): Promise<GitHubUserData | null> {
	try {
		const repos = await githubRequest(`/users/${username}/repos?per_page=100`);
		return {
			repoCount: Array.isArray(repos) ? repos.length : 0,
		};
	} catch (error) {
		console.error('Error fetching GitHub user data:', error);
		return null;
	}
}
