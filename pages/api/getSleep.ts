import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

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
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
