import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "./Delete";
const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4000/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos", error);
        setLoading(false);
      });
  }, []);
  const handleDelete = (postId) => {
    setData(data.filter(post => post.id !== postId));
  };
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className=" p-2">
      <section className="border-2 rounded-xl  flex flex-wrap ">
        {data.map(post=>(
            <div key={post.id} className="border-1 rounded-xl p-7 gap-4 flex flex-col justify-center items-center">
                <div>
                    <img src={post.img} alt={post.titulo} className="w-52 h-auto"/>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">{post.titulo}</h2>
                    <p className="text-gray-500">{post.descripcion}</p>
                    <Delete postId={post.id} onDelete={handleDelete}/>
                </div>
            </div>
        ))}
      </section>
    </div>
  );
};

export default Post;
