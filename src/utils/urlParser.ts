export interface ParsedGitHubUrl {
	type: 'issue' | 'pr_review_comment' | 'pr_general_comment' | 'discussion' | 'unknown';
	owner: string | null;
	repo: string | null;
	number: number | null; // For issue, PR, or discussion number
	commentId: string | null; // For specific comment IDs if present in URL fragment
	originalUrl: string;
}

export function parseGitHubUrl(url: string): ParsedGitHubUrl {
	const commonFields = { owner: null, repo: null, number: null, commentId: null, originalUrl: url };

	// Pattern for PR Review Comments (discussion_r<ID> or pullrequestreview-<ID>)
	// Example: https://github.com/owner/repo/pull/123#discussion_r789
	// Example: https://github.com/owner/repo/pull/123#pullrequestreview-789
	const prReviewCommentMatch = url.match(
		/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)#(?:pullrequestreview-(\d+)|discussion_r(\d+))/
	);
	if (prReviewCommentMatch) {
		return {
			...commonFields,
			type: 'pr_review_comment',
			owner: prReviewCommentMatch[1],
			repo: prReviewCommentMatch[2],
			number: parseInt(prReviewCommentMatch[3], 10),
			commentId: prReviewCommentMatch[4] || prReviewCommentMatch[5],
		};
	}

	// Pattern for Issue/PR General Comments (issuecomment-<ID>)
	// Example: https://github.com/owner/repo/issues/123#issuecomment-456
	// Example: https://github.com/owner/repo/pull/123#issuecomment-456
	const generalCommentMatch = url.match(
		/github\.com\/([^/]+)\/([^/]+)\/(issues|pull)\/(\d+)#issuecomment-(\d+)/
	);
	if (generalCommentMatch) {
		return {
			...commonFields,
			type: generalCommentMatch[3] === 'issues' ? 'issue' : 'pr_general_comment',
			owner: generalCommentMatch[1],
			repo: generalCommentMatch[2],
			number: parseInt(generalCommentMatch[4], 10),
			commentId: generalCommentMatch[5],
		};
	}

	// Pattern for Discussion Comments (discussioncomment-<ID>)
	// Example: https://github.com/owner/repo/discussions/123#discussioncomment-789
	const discussionCommentMatch = url.match(
		/github\.com\/([^/]+)\/([^/]+)\/discussions\/(\d+)#discussioncomment-(\d+)/
	);
	if (discussionCommentMatch) {
		return {
			...commonFields,
			type: 'discussion', // Type is 'discussion', implying specific comment to be fetched or filtered
			owner: discussionCommentMatch[1],
			repo: discussionCommentMatch[2],
			number: parseInt(discussionCommentMatch[3], 10),
			commentId: discussionCommentMatch[4],
		};
	}

	// Pattern for base Issue URL
	// Example: https://github.com/owner/repo/issues/123
	const issueMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/);
	if (issueMatch) {
		return {
			...commonFields,
			type: 'issue',
			owner: issueMatch[1],
			repo: issueMatch[2],
			number: parseInt(issueMatch[3], 10),
		};
	}

	// Pattern for base PR URL
	// Example: https://github.com/owner/repo/pull/123
	const prMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)$/);
	if (prMatch) {
		// A base PR URL implies we want both general and review comments.
		// For simplicity in parsing, we'll mark it as 'pr_general_comment'
		// The main component will handle fetching both types if a base PR URL is given.
		return {
			...commonFields,
			type: 'pr_general_comment', // Or a new type like 'pr_all_comments'
			owner: prMatch[1],
			repo: prMatch[2],
			number: parseInt(prMatch[3], 10),
		};
	}

	// Pattern for base Discussion URL
	// Example: https://github.com/owner/repo/discussions/123
	const discussionMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/discussions\/(\d+)$/);
	if (discussionMatch) {
		return {
			...commonFields,
			type: 'discussion',
			owner: discussionMatch[1],
			repo: discussionMatch[2],
			number: parseInt(discussionMatch[3], 10),
		};
	}

	return { ...commonFields, type: 'unknown' };
}
