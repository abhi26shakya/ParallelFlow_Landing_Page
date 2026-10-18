import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { addWaitlistEntry, getWaitlistEntries, initDatabase, isNeonActive } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Initialize / migrate table in Neon if configured
initDatabase().catch(console.error);

// Health check endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  const isNeon = isNeonActive();
  const { entries } = await getWaitlistEntries();
  res.json({
    status: 'ok',
    neonConnected: isNeon,
    totalWaitlistCount: entries.length,
    timestamp: new Date().toISOString(),
  });
});

// Get waitlist entries (for dashboard / preview modal)
app.get('/api/waitlist', async (_req: Request, res: Response) => {
  const data = await getWaitlistEntries();
  res.json(data);
});

// Join waitlist endpoint with full feedback schema
app.post('/api/waitlist', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      role,
      experience,
      team_size,
      teamSize, // backwards compatibility
      workflow_problem,
      workflow_problem_other,
      sdlcBottleneck, // backwards compatibility
      frustrating_experience,
      valuable_capabilities,
      try_likelihood,
      willing_to_test,
      feedback_suggestions,
      can_contact,
    } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please enter a valid work email format.' });
      return;
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
      res.status(409).json({
        message: "You're already on the waitlist! We will notify you as soon as your batch is ready.",
        isDuplicate: true,
      });
      return;
    }

    if (!result.success) {
      res.status(500).json({ error: result.error || 'Failed to submit waitlist registration.' });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your waitlist access request and early feedback have been recorded.',
      entry: result.entry,
    });
  } catch (error: any) {
    console.error('Waitlist POST error:', error);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ParallelFlow API server listening on http://localhost:${PORT}`);
  console.log(`📡 Neon Status: ${isNeonActive() ? 'LIVE (Neon Cloud)' : 'MOCK (In-memory fallback)'}`);
});
