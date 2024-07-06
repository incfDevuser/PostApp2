import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPost = ({ postId, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar datos actuales del post cuando se monte el componente
    axios.get(`http://localhost:5000/posts/${postId}`)
      .then((response) => {
        const { titulo, descripcion, img } = response.data;
        setFormData({
          titulo,
          descripcion,
          img,
        });
      })
      .catch((error) => {
        console.error("Error al cargar el post", error);
      });
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdatePost = async () => {
    setLoading(true);
    try {
      // Enviar la solicitud PUT con los campos actualizados
      await axios.put(`http://localhost:5000/posts/${postId}`, formData);
      onEdit(); // Llamar a la función onEdit para actualizar la lista de posts después de editar
      onClose(); // Cerrar el formulario después de la actualización exitosa
    } catch (error) {
      console.error("Error al actualizar el post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Post</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.titulo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="img" className="block text-sm font-medium text-gray-700">URL de Imagen</label>
            <input
              type="text"
              id="img"
              name="img"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.img}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdatePost}
              className="inline-flex justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 inline-flex justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
