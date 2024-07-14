import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createSleep(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, duration, date } = req.body;

    console.log('userId, duration, date', userId, duration, date);

    try {
      const sleep = await prisma.sleep.create({
        data: {
          userId,
          duration,
          date: new Date(date),
        },
      });

      if (sleep) {
        return res.status(200).json(sleep);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating sleep entry' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
