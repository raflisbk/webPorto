import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  language?: string;
  stars?: number;
  readme: string;
}

async function fetchWithRetry(fetchFunction: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFunction();
    } catch (error: any) {
      if (error.status === 403 && error.message.includes('API rate limit exceeded')) {
        const resetTime = parseInt(error.response.headers['x-ratelimit-reset'], 10) * 1000;
        const waitTime = resetTime - Date.now() + 1000; // Add 1 second buffer
        console.log(`Rate limit exceeded. Waiting for ${waitTime / 1000} seconds.`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}

export async function getGitHubProjects(username: string): Promise<Project[]> {
  try {
    const response = await fetchWithRetry(() => octokit.repos.listForUser({
      username,
      sort: 'updated',
      direction: 'desc',
      per_page: 6
    }));

    const projects = await Promise.all(response.data.map(async (repo) => {
      let readme = '';
      try {
        const readmeResponse = await fetchWithRetry(() => octokit.repos.getReadme({
          owner: username,
          repo: repo.name,
        }));
        readme = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');
      } catch (error) {
        console.error(`Error fetching README for ${repo.name}:`, error);
        readme = 'README tidak tersedia.';
      }

      return {
        id: repo.name,
        title: repo.name,
        description: repo.description || 'Tidak ada deskripsi',
        link: repo.html_url,
        tags: repo.topics || [],
        language: repo.language,
        stars: repo.stargazers_count,
        readme: readme
      };
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

