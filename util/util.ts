import { Octokit } from '@octokit/rest';
import { Repository } from '../interfaces';

export async function getTopTenContributors(owner: string, repo: string): Promise<(string | undefined)[]> {
  const octokit = new Octokit();
  try {
    const request = await octokit.repos.getContributorsStats({ owner, repo });
    if (request.status == 200) {
      return request.data
        .sort((a, b) => b.total - a.total)
        .map((contribution) => contribution?.author?.login)
        .slice(0, 10);
    } else return [];
  } catch (e) {
    return [];
  }
}

const getRepo = async (owner: string, repo: string): Promise<Repository> => {
  const octokit = new Octokit();
  const information = await octokit.repos.get({ owner, repo });
  const contributors = await getTopTenContributors(owner, repo);
  const author = information?.data?.owner?.login ?? '';
  const { avatar_url, gravatar_id } = information?.data?.owner ?? { avatar_url: '', gravatar_id: '' };
  const description = information?.data?.description ?? '';
  const stars = information.data.stargazers_count;
  const avatar =
    avatar_url != ''
      ? avatar_url
      : gravatar_id != ''
      ? `https://www.gravatar.com/avatar/${gravatar_id}` // from the gravatar documentation
      : '';

  return {
    author,
    stars,
    description,
    avatar,
    contributors,
    repo
  };
};

export { getRepo };
