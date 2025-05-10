interface GitHubRepoData {
  lastUpdate: string;
  languages: string[];
  forks: number;
  openIssues: number;
}

export async function getGitHubRepoData(repoUrl: string): Promise<GitHubRepoData | null> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = repoUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // Fetch repository data
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    const repoData = await repoResponse.json();

    // Fetch languages data
    const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    const languagesData = await languagesResponse.json();

    return {
      lastUpdate: new Date(repoData.updated_at).toLocaleDateString(),
      languages: Object.keys(languagesData),
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}
