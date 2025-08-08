import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  
  // Middleware
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // API Routes (load directly from disk using Node ESM, independent of Vite)
  app.use('/api', async (req, res, next) => {
    try {
      const filePath = path.join(__dirname, 'api', `${req.path}.js`);
      const mod = await import(pathToFileURL(filePath).href).catch((e) => {
        console.error('Load API module failed:', filePath, e?.message || e);
        throw e;
      });
      if (typeof mod.default === 'function') {
        try { return await mod.default(req, res); } catch (err) {
          console.error('API handler error:', req.path, err?.message || err);
          res.status(500).json({ error: 'handler_exception', message: String(err?.message || err) });
          return;
        }
      }
      return res.status(404).json({ error: 'API handler missing' });
    } catch (error) {
      console.error('API route error:', req.path, error?.message || error);
      return res.status(404).json({ error: 'api_not_found', path: req.path });
    }
  });

  // Create Vite server in middleware mode (after mounting API so /api is handled first)
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Dev server running at http://localhost:3000');
  });
}

createServer();
