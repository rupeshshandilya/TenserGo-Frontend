import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    res.status(200).json({ message: 'Feedback received' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
