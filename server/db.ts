import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

export interface WaitlistSubmission {
  id?: string | number;
  name?: string;
  email: string;
  role?: string;
  experience?: string;
  team_size?: string;
  workflow_problem?: string | string[];
  workflow_problem_other?: string;
  frustrating_experience?: string;
  valuable_capabilities?: string[] | string;
  try_likelihood?: string;
  willing_to_test?: string;
  feedback_suggestions?: string;
  can_contact?: boolean;
  created_at?: string;
}

const dbUrl = process.env.DATABASE_URL?.trim();
const isNeonConfigured = Boolean(
  dbUrl && (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://'))
);

// In-memory mock storage
const mockStore: WaitlistSubmission[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    email: 'team@parallelflow.ai',
    role: 'Engineering lead / manager',
    experience: '5+ years',
    team_size: '6–15 people',
    workflow_problem: 'Switching between too many tools',
    valuable_capabilities: JSON.stringify(['A shared AI agent that works with the whole team', 'Task delegation and progress tracking']),
    try_likelihood: 'Very likely',
    willing_to_test: 'Yes',
    can_contact: true,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

let sqlClient: ReturnType<typeof neon> | null = null;

if (isNeonConfigured && dbUrl) {
  try {
    sqlClient = neon(dbUrl);
    console.log('⚡ [Neon DB] Connected to Neon PostgreSQL database.');
  } catch (err) {
    console.error('❌ [Neon DB] Failed to initialize Neon client:', err);
  }
} else {
  console.log('ℹ️  [Neon DB] Operating in Mock / In-Memory mode. Set DATABASE_URL in .env to connect live Neon DB.');
}

export async function initDatabase(): Promise<void> {
  if (sqlClient) {
    try {
      await sqlClient`
        CREATE TABLE IF NOT EXISTS waitlist_entries (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) NOT NULL UNIQUE,
          role VARCHAR(100),
          experience VARCHAR(50),
          team_size VARCHAR(50),
          workflow_problem TEXT,
          workflow_problem_other TEXT,
          frustrating_experience TEXT,
          valuable_capabilities TEXT,
          try_likelihood VARCHAR(50),
          willing_to_test VARCHAR(50),
          feedback_suggestions TEXT,
          can_contact BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      // Backwards-compatible migrations if table previously existed
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS name VARCHAR(255);`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS role VARCHAR(100);`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS experience VARCHAR(50);`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS workflow_problem TEXT;`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS workflow_problem_other TEXT;`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS frustrating_experience TEXT;`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS valuable_capabilities TEXT;`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS try_likelihood VARCHAR(50);`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS willing_to_test VARCHAR(50);`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS feedback_suggestions TEXT;`;
      await sqlClient`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS can_contact BOOLEAN DEFAULT TRUE;`;

      console.log('✅ [Neon DB] Table `waitlist_entries` verified/updated in Neon.');
    } catch (err) {
      console.error('❌ [Neon DB] Failed to verify/update table in Neon:', err);
    }
  }
}

export async function addWaitlistEntry(
  data: WaitlistSubmission
): Promise<{ success: boolean; isDuplicate?: boolean; entry?: WaitlistSubmission; error?: string }> {
  const normalizedEmail = (data.email || '').trim().toLowerCase();
  if (!normalizedEmail) {
    return { success: false, error: 'Email is required' };
  }

  const caps = Array.isArray(data.valuable_capabilities)
    ? JSON.stringify(data.valuable_capabilities)
    : data.valuable_capabilities || '[]';

  const problemsStr = Array.isArray(data.workflow_problem)
    ? data.workflow_problem.join(', ')
    : (data.workflow_problem || '');

  if (sqlClient) {
    try {
      const existing = await sqlClient`
        SELECT id FROM waitlist_entries WHERE LOWER(email) = ${normalizedEmail} LIMIT 1
      `;
      if (existing.length > 0) {
        return { success: false, isDuplicate: true };
      }

      const result = await sqlClient`
        INSERT INTO waitlist_entries (
          name, email, role, experience, team_size,
          workflow_problem, workflow_problem_other, frustrating_experience,
          valuable_capabilities, try_likelihood, willing_to_test,
          feedback_suggestions, can_contact
        ) VALUES (
          ${data.name || ''},
          ${normalizedEmail},
          ${data.role || ''},
          ${data.experience || ''},
          ${data.team_size || ''},
          ${problemsStr},
          ${data.workflow_problem_other || ''},
          ${data.frustrating_experience || ''},
          ${caps},
          ${data.try_likelihood || ''},
          ${data.willing_to_test || ''},
          ${data.feedback_suggestions || ''},
          ${data.can_contact ?? true}
        )
        RETURNING *
      `;

      return { success: true, entry: result[0] as WaitlistSubmission };
    } catch (err: any) {
      console.error('Error inserting into Neon DB:', err);
      if (err.code === '23505') {
        return { success: false, isDuplicate: true };
      }
      return { success: false, error: err.message || 'Database error' };
    }
  } else {
    // In-memory mock
    const duplicate = mockStore.some(
      (item) => item.email.toLowerCase() === normalizedEmail
    );
    if (duplicate) {
      return { success: false, isDuplicate: true };
    }

    const newEntry: WaitlistSubmission = {
      id: mockStore.length + 1,
      name: data.name || '',
      email: normalizedEmail,
      role: data.role || '',
      experience: data.experience || '',
      team_size: data.team_size || '',
      workflow_problem: problemsStr,
      workflow_problem_other: data.workflow_problem_other || '',
      frustrating_experience: data.frustrating_experience || '',
      valuable_capabilities: caps,
      try_likelihood: data.try_likelihood || '',
      willing_to_test: data.willing_to_test || '',
      feedback_suggestions: data.feedback_suggestions || '',
      can_contact: data.can_contact ?? true,
      created_at: new Date().toISOString(),
    };
    mockStore.unshift(newEntry);
    return { success: true, entry: newEntry };
  }
}

export async function getWaitlistEntries(): Promise<{ entries: WaitlistSubmission[]; isLiveNeon: boolean }> {
  if (sqlClient) {
    try {
      const rows = await sqlClient`
        SELECT * FROM waitlist_entries ORDER BY created_at DESC
      `;
      return { entries: rows as WaitlistSubmission[], isLiveNeon: true };
    } catch (err) {
      console.error('Error fetching waitlist from Neon:', err);
      return { entries: [], isLiveNeon: true };
    }
  }

  return { entries: mockStore, isLiveNeon: false };
}

export function isNeonActive(): boolean {
  return isNeonConfigured && sqlClient !== null;
}
