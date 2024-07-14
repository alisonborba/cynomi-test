import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          _count: {
            select: { sleeps: true },
          },
          sleeps: {
            select: {
              duration: true,
              date: true,
            },
          },
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error getting users' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
