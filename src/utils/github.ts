import { GITHUB_API_BASE_URL } from '@src/consts';

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

// Interfaces for GitHub GraphQL Discussion Comments
interface GraphQLDiscussionAuthor {
	login: string;
	avatarUrl: string; // Note: GraphQL often uses camelCase
	url: string; // Link to user profile
}

export interface GraphQLDiscussionCommentNode {
	id: string; // GraphQL Node ID
	databaseId: number; // Numeric ID for GitHubIssueComment.id
	author: GraphQLDiscussionAuthor | null; // Author can sometimes be null if deleted
	bodyHTML: string; // Or 'body' if bodyHTML is not directly available
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	url: string; // Direct link to the comment
	replies?: {
		// If fetching replies
		nodes: GraphQLDiscussionCommentNode[];
	};
}

interface GraphQLDiscussionCommentsConnection {
	nodes: GraphQLDiscussionCommentNode[];
	// pageInfo and totalCount might be here if needed for pagination
}

interface GraphQLDiscussion {
	comments: GraphQLDiscussionCommentsConnection;
}

interface GraphQLRepositoryInfo {
	// Using a distinct name for the repository data structure
	discussion: GraphQLDiscussion | null;
}

interface GraphQLResponse {
	// Simplified for this specific query structure
	repository: GraphQLRepositoryInfo | null;
}
// End of GraphQL interfaces

interface GitHubUser {
	login: string;
	avatar_url: string;
	html_url: string; // URL to the user's GitHub profile
}

export interface GitHubIssueComment {
	id: number;
	user: GitHubUser;
	body: string; // The comment text
	created_at: string; // ISO 8601 date string
	updated_at: string; // ISO 8601 date string
	html_url: string; // URL to the comment itself
}

// Helper function to extract owner and repo from GitHub URL
export function getRepoDetails(url: string) {
	const regex = /github.com\/([^/]+)\/([^/]+)/;
	const matches = url.match(regex);
	return matches ? { owner: matches[1], repo: matches[2] } : null;
}

// Helper function to make authenticated GitHub API requests
async function githubRequest<T>(
	endpoint: string,
	acceptHeader: string = 'application/vnd.github.v3+json'
): Promise<T> {
	const githubToken = import.meta.env.PUBLIC_GITHUB_TOKEN;
	const response = await fetch(`${GITHUB_API_BASE_URL}${endpoint}`, {
		headers: {
			Accept: acceptHeader, // Use the parameter
			Authorization: `token ${githubToken}`,
		},
	});
	if (!response.ok) {
		throw new Error(`GitHub API responded with status code: ${response.status}`);
	}
	return response.json();
}

// Helper function to make authenticated GitHub GraphQL API requests
async function githubGraphQLRequest<T>(
	query: string,
	variables: Record<string, any>
): Promise<T | null> {
	const githubToken = import.meta.env.PUBLIC_GITHUB_TOKEN;
	if (!githubToken) {
		console.error('GitHub token is not available. Cannot make GraphQL request.');
		return null;
	}

	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `token ${githubToken}`,
			},
			body: JSON.stringify({ query, variables }),
		});

		if (!response.ok) {
			throw new Error(`GitHub GraphQL API responded with status code: ${response.status}`);
		}

		const responseData = await response.json();

		if (responseData.errors) {
			console.error('GitHub GraphQL API errors:', responseData.errors);
			return null; // Or handle errors more gracefully
		}

		return responseData.data as T;
	} catch (error) {
		console.error('Error making GitHub GraphQL request:', error);
		return null;
	}
}

// Get discussion comments for a specific discussion
export async function getGitHubDiscussionComments(
	owner: string,
	repo: string,
	discussionNumber: number
): Promise<GitHubIssueComment[] | null> {
	const query = `
    query GetDiscussionComments($owner: String!, $repo: String!, $discussionNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        discussion(number: $discussionNumber) {
          comments(first: 50) { # Fetch up to 50 top-level comments
            nodes {
              id # GraphQL Node ID
              databaseId # Numeric ID
              author {
                login
                avatarUrl
                url
              }
              bodyHTML
              createdAt
              updatedAt
              url # This is the html_url for the comment
            }
          }
        }
      }
    }
  `;

	const variables = { owner, repo, discussionNumber };

	try {
		// Note: The GraphQLResponse interface was defined to have 'repository: GraphQLRepositoryInfo | null'
		// And GraphQLRepositoryInfo has 'discussion: GraphQLDiscussion | null'
		// And GraphQLDiscussion has 'comments: GraphQLDiscussionCommentsConnection'
		// And GraphQLDiscussionCommentsConnection has 'nodes: GraphQLDiscussionCommentNode[]'
		// So the expected type for githubGraphQLRequest should align with this.
		const data = await githubGraphQLRequest<GraphQLResponse>(query, variables);

		if (
			!data ||
			!data.repository ||
			!data.repository.discussion ||
			!data.repository.discussion.comments ||
			!data.repository.discussion.comments.nodes
		) {
			console.warn(
				`No discussion comments found for ${owner}/${repo} discussion #${discussionNumber}, or data structure is unexpected.`
			);
			return null;
		}

		const commentNodes = data.repository.discussion.comments.nodes;

		const mappedComments: GitHubIssueComment[] = commentNodes.map((node) => ({
			id: node.databaseId, // Using databaseId as it's a number
			user: {
				login: node.author?.login || 'ghost',
				avatar_url: node.author?.avatarUrl || '', // Provide a default or handle missing avatar
				html_url: node.author?.url || '#', // Provide a default or handle missing user URL
			},
			body: node.bodyHTML,
			created_at: node.createdAt,
			updated_at: node.updatedAt,
			html_url: node.url,
		}));

		return mappedComments;
	} catch (error) {
		console.error(
			`Error fetching or processing GitHub discussion comments for ${owner}/${repo} discussion #${discussionNumber}:`,
			error
		);
		return null;
	}
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

// Interface for the raw structure of Issue comments from GitHub API when requesting HTML
interface RawGitHubIssueComment {
	id: number;
	user: GitHubUser; // Assuming GitHubUser is suitable here
	body_html: string; // Expecting HTML content
	created_at: string;
	updated_at: string;
	html_url: string;
	// body: string; // This would be the markdown version, might not be needed if body_html is present
}

// Get comments for a specific issue in a repository
export async function getGitHubIssueComments(
	repoUrl: string,
	issueNumber: number
): Promise<GitHubIssueComment[] | null> {
	try {
		const repoDetails = getRepoDetails(repoUrl);
		if (!repoDetails) {
			console.error('Invalid repoUrl provided to getGitHubIssueComments:', repoUrl);
			return null;
		}
		const { owner, repo } = repoDetails;

		const rawComments = await githubRequest<RawGitHubIssueComment[]>(
			`/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
			'application/vnd.github.v3.html+json' // Request HTML content
		);

		if (!rawComments) {
			return null;
		}

		const mappedComments: GitHubIssueComment[] = rawComments.map((rawComment) => ({
			id: rawComment.id,
			user: rawComment.user,
			body: rawComment.body_html, // Use HTML content for the body
			created_at: rawComment.created_at,
			updated_at: rawComment.updated_at,
			html_url: rawComment.html_url,
		}));

		return mappedComments;
	} catch (error) {
		console.error(
			`Error fetching GitHub issue comments for ${repoUrl}, issue #${issueNumber}:`,
			error
		);
		return null;
	}
}

// Interface for the raw structure of PR review comments from GitHub API
interface RawGitHubPullRequestReviewComment {
	id: number;
	user: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
	body_html: string; // Expecting HTML content
	created_at: string;
	updated_at: string; // This might sometimes be null
	html_url: string;
}

// Interface for PR reviews
interface RawGitHubPullRequestReview {
	id: number;
	user: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
	body_html: string; // Expecting HTML content
	state: string; // 'APPROVED', 'CHANGES_REQUESTED', 'COMMENTED', etc.
	submitted_at: string;
	html_url: string;
}

// Get pull request review comments for a specific pull request
export async function getGitHubPullRequestReviewComments(
	owner: string,
	repo: string,
	pullNumber: number,
	reviewId?: string
): Promise<GitHubIssueComment[] | null> {
	try {
		// If a specific review ID is provided, fetch that review
		if (reviewId) {
			console.log(`Fetching specific review: ${reviewId} for PR #${pullNumber}`);
			
			// Convert reviewId to a number if it's in the format 'pullrequestreview-123456'
			let numericReviewId = reviewId;
			if (reviewId.startsWith('pullrequestreview-')) {
				numericReviewId = reviewId.replace('pullrequestreview-', '');
			}
			
			// Fetch the specific review
			const reviews = await githubRequest<RawGitHubPullRequestReview[]>(
				`/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
				'application/vnd.github.v3.html+json'
			);
			
			if (!reviews || reviews.length === 0) {
				console.log(`No reviews found for PR #${pullNumber}`);
				return null;
			}
			
			// Find the specific review by ID
			const targetReview = reviews.find(review => review.id.toString() === numericReviewId);
			
			if (!targetReview) {
				console.log(`Review with ID ${reviewId} not found for PR #${pullNumber}`);
				return null;
			}
			
			// Convert the review to the expected format
			const mappedReview: GitHubIssueComment = {
				id: targetReview.id,
				user: {
					login: targetReview.user.login,
					avatar_url: targetReview.user.avatar_url,
					html_url: targetReview.user.html_url,
				},
				body: targetReview.body_html,
				created_at: targetReview.submitted_at,
				updated_at: targetReview.submitted_at,
				html_url: targetReview.html_url,
			};
			
			return [mappedReview];
		}
		
		// If no specific review ID, fetch all inline comments
		const rawComments = await githubRequest<RawGitHubPullRequestReviewComment[]>(
			`/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
			'application/vnd.github.v3.html+json' // Request HTML content
		);

		if (!rawComments) {
			return null;
		}

		const mappedComments: GitHubIssueComment[] = rawComments.map((rawComment) => ({
			id: rawComment.id,
			user: {
				login: rawComment.user.login,
				avatar_url: rawComment.user.avatar_url,
				html_url: rawComment.user.html_url,
			},
			body: rawComment.body_html, // Use HTML content for the body
			created_at: rawComment.created_at,
			updated_at: rawComment.updated_at || rawComment.created_at, // Fallback if updated_at is null/undefined
			html_url: rawComment.html_url,
		}));

		return mappedComments;
	} catch (error) {
		console.error(
			`Error fetching GitHub pull request review comments for ${owner}/${repo}, PR #${pullNumber}:`,
			error
		);
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
