import { Router } from "express";
import { methods } from "../Controllers/postControllers.js";
const router = Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await methods.findPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.error(error);
  }
});
router.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  if (!titulo || !img || !descripcion) {
    return res.status(400).json({ message: "Llena todos los campos por favor" });
  }
  const nuevoPost = { titulo, img, descripcion };
  try {
    const post = await methods.createPost(nuevoPost);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.error(error);
  }
});
router.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, img } = req.body;

  try {
    const updatedPost = await methods.updatePost(id, titulo, descripcion, img);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.error(error);
  }
});
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDeleted = await methods.deletePost(id);
    if (!postDeleted) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.error(error);
  }
});
export default router;
