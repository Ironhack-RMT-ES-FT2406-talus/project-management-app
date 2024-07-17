import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...logic for creating a new Project should be here

    // 1. recopilar la data a crear
    const newProject = {
      title: title,
      description: description
    }

    try {
      
      // 2. pedirle a la API que cree un nuevo proyecto
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/projects`, newProject)
      //                          |                                       |
      //              el URL de contacto                         el body para crear/editar

      // 3. redireccionar a la página de /projects
      navigate("/projects")

    } catch (error) {
      console.log(error)
    }

  };  

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;