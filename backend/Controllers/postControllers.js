import pool from "../Config/db.js";
const findPosts = async () => {
  try {
    const query = "SELECT * FROM post";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    throw new Error("Error con la operacion", +error.message);
  }
};
const createPost = async (post) => {
  try {
    const query =
      "INSERT INTO post (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING * ";
    const response = await pool.query(query, [
      post.titulo,
      post.img,
      post.descripcion,
    ]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error con la operacion" +error.message);
  }
};
const updatePost = async (id, titulo, descripcion, img) => {
  try {
    const query = `
      UPDATE post 
      SET titulo = $1, descripcion = $2, img = $3 
      WHERE id = $4 
      RETURNING id, titulo, descripcion, img`;
    const response = await pool.query(query, [titulo, descripcion, img, id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error al actualizar el post: " + error.message);
  }
};
const deletePost = async (id) => {
  try {
    const query = "DELETE FROM post WHERE id = $1 RETURNING * ";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    throw new Error("Error con la operacion" +error.message);
  }
};
export const methods = {
  findPosts,
  createPost,
  updatePost,
  deletePost,
};
