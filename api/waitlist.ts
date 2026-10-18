import type { VercelRequest, VercelResponse } from '@vercel/node';
import { addWaitlistEntry, getWaitlistEntries, initDatabase } from '../server/db.js';

let isDbInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Lazily ensure Neon table exists
  if (!isDbInitialized) {
    try {
      await initDatabase();
      isDbInitialized = true;
    } catch (e) {
      console.error('[API] DB init error:', e);
    }
  }

  if (req.method === 'GET') {
    try {
      const data = await getWaitlistEntries();
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Waitlist GET error:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch waitlist' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        role,
        experience,
        team_size,
        teamSize,
        workflow_problem,
        workflow_problem_other,
        sdlcBottleneck,
        frustrating_experience,
        valuable_capabilities,
        try_likelihood,
        willing_to_test,
        feedback_suggestions,
        can_contact,
      } = req.body || {};

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please enter a valid work email format.' });
      }

      const result = await addWaitlistEntry({
        name: name?.trim(),
        email: email.trim(),
        role: role || 'Developer',
        experience: experience || '',
        team_size: team_size || teamSize || '2–5 people',
        workflow_problem: workflow_problem || sdlcBottleneck || '',
        workflow_problem_other: workflow_problem_other || '',
        frustrating_experience: frustrating_experience || '',
        valuable_capabilities: valuable_capabilities || [],
        try_likelihood: try_likelihood || 'Very likely',
        willing_to_test: willing_to_test || 'Yes',
        feedback_suggestions: feedback_suggestions || '',
        can_contact: can_contact ?? true,
      });

      if (result.isDuplicate) {
        return res.status(409).json({
          message: "You're already on the waitlist! We will notify you as soon as your batch is ready.",
          isDuplicate: true,
        });
      }

      if (!result.success) {
        return res.status(500).json({ error: result.error || 'Failed to submit waitlist registration.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your waitlist access request and early feedback have been recorded.',
        entry: result.entry,
      });
    } catch (error: any) {
      console.error('Waitlist POST error:', error);
      return res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
