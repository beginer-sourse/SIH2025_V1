import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());

const uploadsRoot = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

function safeFolder(reqFolder) {
  if (!reqFolder) return '';
  const parts = String(reqFolder)
    .split('/')
    .filter(Boolean)
    .filter(seg => /^[a-zA-Z0-9-_]+$/.test(seg));
  return parts.join('/');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const relative = safeFolder(req.body.folder);
    const dest = path.join(uploadsRoot, relative);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${timestamp}-${sanitizedOriginal}`);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.array('files', 10), (req, res) => {
  const relative = safeFolder(req.body.folder);
  const prefix = relative ? `${relative}/` : '';
  const files = (req.files || []).map(f => ({
    url: `/uploads/${prefix}${path.basename(f.filename)}`,
    originalName: f.originalname,
    mimetype: f.mimetype,
    size: f.size
  }));
  res.json({ files });
});

app.use('/uploads', express.static(uploadsRoot));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Local upload server running at http://localhost:${PORT}`);
});