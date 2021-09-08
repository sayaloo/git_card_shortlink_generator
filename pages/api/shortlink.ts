import type { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';
import { nanoid } from 'nanoid';

import dbConnect from '../../lib/mongodb';
import User from '../../models/user';

async function generate(
  owner: string,
  repo: string,
  color: string,
): Promise<string> {
  await dbConnect();

  try {
    const id = nanoid(10);
    const u = new User({ nano_id: id, repo: repo, color, owner: owner });
    await u.save();
    const user = u.toObject({ getters: true });
    return user?.nano_id;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { owner, repo, color = '#FFF' } = req.body || {};
      if (
        !owner ||
        typeof owner !== 'string' ||
        !repo ||
        typeof repo !== 'string'
      ) {
        res.status(400).json('Invalid inputs.');
      }
      const octokit = new Octokit();
      try {
        const _ = await octokit.repos.get({ owner, repo });
        const shortLink = await generate(owner, repo, color);
        res.status(200).json({ shortLink });
      } catch (e) {
        res
          .status(404)
          .json(
            'Repository not found',
          );
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(400).end();
  }
};
