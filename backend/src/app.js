// backend/src/app.js
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { manipuladorErros } from './middlewares/erros.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(manipuladorErros);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export default app;