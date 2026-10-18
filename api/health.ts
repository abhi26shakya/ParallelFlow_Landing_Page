import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getWaitlistEntries, isNeonActive } from '../server/db.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const isNeon = isNeonActive();
    const { entries } = await getWaitlistEntries();
    return res.status(200).json({
      status: 'ok',
      neonConnected: isNeon,
      totalWaitlistCount: entries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Health check error' });
  }
}
