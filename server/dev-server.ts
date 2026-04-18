// server/dev-server.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { postEnterpriseJoin } from '../api/enterprise/_handlers';

const app = express();
app.use(express.json());
const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: corsOrigins.length ? corsOrigins : undefined, credentials: false }));
const PORT = process.env.PORT || 3001;
const apiLimiter = rateLimit({ windowMs: 60_000, max: 60 });
app.use('/api/', apiLimiter);
const formLimiter = rateLimit({ windowMs: 60_000, max: 10 });
app.post('/api/enterprise/join', formLimiter, postEnterpriseJoin);
app.listen(PORT, () => console.log(`[dev-api] http://localhost:${PORT}`));
