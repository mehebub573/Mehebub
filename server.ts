import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface RsvpRecord {
  id: string;
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  events: string[];
  message: string;
  createdAt: string;
}

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'rsvps.json');

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readRsvps(): RsvpRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RsvpRecord[]) : [];
  } catch {
    return [];
  }
}

function writeRsvps(records: RsvpRecord[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

function buildSummary(records: RsvpRecord[]) {
  const attendingRecords = records.filter((r) => r.attending === 'yes');
  const declinedRecords = records.filter((r) => r.attending === 'no');
  const totalConfirmedGuests = attendingRecords.reduce((sum, r) => sum + r.guestCount, 0);
  return {
    totalResponses: records.length,
    attendingResponses: attendingRecords.length,
    declinedResponses: declinedRecords.length,
    totalConfirmedGuests,
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/rsvps', (_req: Request, res: Response) => {
    const records = readRsvps();
    const sorted = [...records].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json({
      rsvps: sorted,
      summary: buildSummary(records),
    });
  });

  app.post('/api/rsvps', (req: Request, res: Response) => {
    const body = req.body as Partial<RsvpRecord>;
    const guestName = typeof body.guestName === 'string' ? body.guestName.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const attending = body.attending === 'no' ? 'no' : body.attending === 'yes' ? 'yes' : null;
    const rawCount = typeof body.guestCount === 'number' ? Math.floor(body.guestCount) : 1;
    const guestCount = attending === 'yes' ? Math.min(Math.max(rawCount, 1), 6) : 0;
    const allowedEvents = new Set(['holud', 'biye', 'boubhat']);
    const events = Array.isArray(body.events)
      ? body.events.filter((e): e is string => typeof e === 'string' && allowedEvents.has(e))
      : [];
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 400) : '';

    if (!guestName || guestName.length < 2 || guestName.length > 80) {
      res.status(400).json({ error: 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন (২–৮০ অক্ষর)।' });
      return;
    }
    if (!attending) {
      res.status(400).json({ error: 'অনুগ্রহ করে আপনার উপস্থিতি নির্বাচন করুন।' });
      return;
    }
    if (attending === 'yes' && events.length === 0) {
      res.status(400).json({ error: 'অনুগ্রহ করে অন্তত একটি অনুষ্ঠান নির্বাচন করুন।' });
      return;
    }

    const newRecord: RsvpRecord = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      guestName,
      phone: phone.slice(0, 30),
      attending,
      guestCount,
      events: attending === 'yes' ? events : [],
      message,
      createdAt: new Date().toISOString(),
    };

    const existing = readRsvps();
    const updated = [newRecord, ...existing];
    writeRsvps(updated);

    res.status(201).json({
      rsvp: newRecord,
      summary: buildSummary(updated),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding Invitation Hub listening on http://localhost:${PORT}`);
  });
}

startServer();
