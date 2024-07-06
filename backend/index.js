import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import postRoutes from './Routes/postRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use('/', postRoutes);