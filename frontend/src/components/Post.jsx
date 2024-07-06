import React, { useState, useEffect } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (postId) => {
    setEditingPostId(postId);
  };

  const handleEditClose = () => {
    setEditingPostId(null);
  };

  const handleUpdatePost = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos", error);
        setLoading(false);
      });
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      setData(data.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error al eliminar el post", error);
    }
  };;

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-2">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl p-4 shadow-md"
          >
            <div>
              <img src={post.img} alt={post.titulo} className="w-full h-auto rounded-xl" />
            </div>
            <div className="mt-4">
              <h2 className="font-bold text-lg">{post.titulo}</h2>
              <p className="text-gray-500">{post.descripcion}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-10">
              <button
                onClick={() => handleEdit(post.id)}
                className="inline-flex justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="inline-flex justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </section>
      {editingPostId && (
        <EditPost
          postId={editingPostId}
          onClose={handleEditClose}
          onEdit={handleUpdatePost}
        />
      )}
    </div>
  );
};

export default Post;
