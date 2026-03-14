export interface RepoStats {
  stars: number;
  forks: number;
}

/**
 * Fetches real-time GitHub repository stats (stars, forks).
 * Gracefully degrades to static data or 0 if API fails or token is missing.
 *
 * @param githubUrl The full GitHub URL (e.g., https://github.com/janedoe/antigravity-ui)
 */
export async function getGithubRepoStats(githubUrl?: string): Promise<RepoStats | null> {
  if (!githubUrl) return null;

  try {
    // Extract owner and repo from URL
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = githubUrl.match(urlPattern);

    if (!match) return null;

    const [, owner, repo] = match;

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Use Next.js fetch with next: { revalidate: 3600 } for ISR (cache for 1 hour)
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch GitHub stats for ${owner}/${repo}: ${res.statusText}`);
      return { stars: 0, forks: 0 }; // Fallback to 0 if API limits reached or other errors
    }

    const data = await res.json();

    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { stars: 0, forks: 0 }; // Fallback
  }
}
