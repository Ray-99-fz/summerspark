import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registrationRoutes from './routes/registration.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api', registrationRoutes);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});