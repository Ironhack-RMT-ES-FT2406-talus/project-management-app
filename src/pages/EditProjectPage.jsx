import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
      console.log(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ...updated logic should be here
    
    const updatedProject = {
      title: title,
      description:description
    }
      
    try {

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`, updatedProject)

      navigate(`/projects/${params.projectId}`)
      
    } catch (error) {
      console.log(error)
    }

  };

  const deleteProject = async () => {
    // ...delete logic should be here
    
    try {
      
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)

      navigate("/projects")

    } catch (error) {
      console.log(error)
    }

  }; 

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;
