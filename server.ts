import express from 'express';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

app.use(express.json());
app.use(cookieParser());

// --- Auth Middleware ---
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Auth: Signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const info = stmt.run(email, hashedPassword);
    
    const token = jwt.sign({ id: info.lastInsertRowid, email }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ id: info.lastInsertRowid, email });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user: any = stmt.get(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth: Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Auth: Me
app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  res.json(req.user);
});

// Posts: Create (Generate)
app.post('/api/posts/generate', authenticateToken, async (req: any, res) => {
  const { platform, tone, count, topic } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API Key not configured' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Generate ${count} ${tone} social media posts for ${platform} about "${topic}". Return ONLY a JSON array of strings, where each string is a post content. Do not include markdown formatting like \`\`\`json.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let text = response.text || '[]';
    // Clean up markdown if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let postsContent = [];
    try {
      postsContent = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response:", text);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    const stmt = db.prepare('INSERT INTO posts (user_id, content, platform, tone, status) VALUES (?, ?, ?, ?, ?)');
    const createdPosts = [];

    const insert = db.transaction((posts) => {
      for (const content of posts) {
        const info = stmt.run(req.user.id, content, platform, tone, 'draft');
        createdPosts.push({ id: info.lastInsertRowid, content, platform, tone, status: 'draft' });
      }
    });

    insert(postsContent);
    res.json(createdPosts);

  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: 'Failed to generate posts' });
  }
});

// Posts: List
app.get('/api/posts', authenticateToken, (req: any, res) => {
  const stmt = db.prepare('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC');
  const posts = stmt.all(req.user.id);
  res.json(posts);
});

// Posts: Update (Schedule/Edit)
app.put('/api/posts/:id', authenticateToken, (req: any, res) => {
  const { content, status, scheduled_date } = req.body;
  const stmt = db.prepare('UPDATE posts SET content = ?, status = ?, scheduled_date = ? WHERE id = ? AND user_id = ?');
  const info = stmt.run(content, status, scheduled_date, req.params.id, req.user.id);
  
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  res.json({ success: true });
});

// Posts: Delete
app.delete('/api/posts/:id', authenticateToken, (req: any, res) => {
  const stmt = db.prepare('DELETE FROM posts WHERE id = ? AND user_id = ?');
  const info = stmt.run(req.params.id, req.user.id);
  
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  res.json({ success: true });
});

// Dashboard Stats
app.get('/api/stats', authenticateToken, (req: any, res) => {
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM posts WHERE user_id = ?');
  const scheduledStmt = db.prepare("SELECT COUNT(*) as count FROM posts WHERE user_id = ? AND status = 'scheduled'");
  const publishedStmt = db.prepare("SELECT COUNT(*) as count FROM posts WHERE user_id = ? AND status = 'published'");

  res.json({
    total: totalStmt.get(req.user.id),
    scheduled: scheduledStmt.get(req.user.id),
    published: publishedStmt.get(req.user.id),
  });
});


// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files (if built)
    // app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
