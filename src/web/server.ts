import app from './app';
import dotenv from 'dotenv';
import { connectDatabase } from '../database/config/database';

dotenv.config();
const PORT = process.env.PORT;

app.get('/', async (req, res) => {
    try {
      await connectDatabase();
      res.send('Banco de dados conectado com sucesso!');
    } catch (error) {
      res.status(500).send('Não foi possível conectar ao banco de dados.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta http://localhost:${PORT}`);
});