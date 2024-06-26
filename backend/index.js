import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { methods } from "./Methods/methods.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
//RUTAS PARA LAS APIS
app.get("/posts", async (req, res) => {
  try {
    const posts = await methods.findAll();
    return res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
///CREAR UN NUEVO POST
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  if (!titulo || !img || !descripcion) {
    return res
      .status(400)
      .json({ message: "Llena todos los campos por favor" });
  }

  const nuevoPost = {
    titulo,
    img,
    descripcion,
  };

  try {
    const post = await methods.createPost(nuevoPost);
    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
//ELIMINAR UN POST
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDeleted = await methods.deletePost(id);
    if (!postDeleted) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

