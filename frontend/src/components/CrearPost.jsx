import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CrearPost = () => {
  //Setear las variables para useState
  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoPost = { titulo, img, descripcion };
    try {
      const response = await axios.post(
        "http://localhost:4000/posts",
        nuevoPost
      );
      toast.success("Post creado correctamente");
      setTitulo("");
      setImg("");
      setDescripcion("");
    } catch (error) {
      toast.error("Error al crear post");
      console.error("Error al crear el post", error);
    }
  };
  return (
    <div className="flex flex-col justify-center border-2 rounded-xl items-center p-7">
      <p className="font-semibold text-xl text-center">Agregar nuevo post</p>
      <p className="text-center text-sm mt-2 text-gray-500 w-72">
        No te detengas! crea un nuevo post y muestra al mundo lo que piensas
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-9 p-6"
      >
        <div className="flex flex-col justify-start">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="border-2 border-gray-300  rounded-lg w-96 h-11 p-2"
            placeholder="Titulo"
          />
        </div>
        <div className="flex flex-col justify-start">
          <label>URL de la imagen:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            className="border-2 border-gray-300 rounded-lg w-96 h-11 p-2"
            placeholder="URL"
          />
          {img && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={img}
                alt="Vista previa"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border-2 border-gray-300 rounded-lg w-96  h-24 p-2"
            placeholder="Descripcion"
          ></textarea>
        </div>
        <button className="rounded-lg bg-green-600 p-2 w-44 text-white font-bold">
          Agregar Post
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearPost;
