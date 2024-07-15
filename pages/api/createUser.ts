import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, gender } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is requierd' });
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          gender,
        },
      });

      if (user) {
        return res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
