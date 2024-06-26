import pool from "../Config/db.js";
const findAll = async () => {
  try {
    const response = await pool.query("SELECT * FROM post");
    return response.rows;
  } catch (error) {
    throw new Error("Error al buscar todos los posts: " + error.message);
  }
};
const findById = async (id) => {
  try {
    const query = "SELECT * FROM post WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    throw new Error("Error al obtener el post", +error.message);
  }
};
const createPost = async (post) => {
  try {
    const query =
      "INSERT INTO post (titulo, img, descripcion) VALUES ($1, $2, $3)  RETURNING *";
    const response = await pool.query(query, [
      post.titulo,
      post.img,
      post.descripcion,
    ]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error al crear el post", +error.message);
  }
};
const deletePost = async (id) => {
  try {
    const query = "DELETE FROM post WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error al eliminar el post: " + error.message);
  }
};
const actualizarPost = async (id, titulo, img, descripcion) => {
  try {
    const query =
      "UPDATE post SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *";
    const response = await pool.query(query, [titulo, img, descripcion, id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el post: " + error.message);
  }
};
export const methods = {
  findAll,
  findById,
  createPost,
  deletePost,
  actualizarPost,
};
