import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectListPage() {

  const [ projects, setProjects ] = useState(null)

  useEffect(() => {

    //* en vez de fetch, usaremos axios (es más avanzada)
    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
    .then((response) => {
      //* con axios no es necesario el response.json, sino que ya tenemos la data de la API
      //* con axios, la data requerida SIEMPRE se ubicará en response.data
      console.log(response)
      setProjects( response.data )
    })
    .catch((error) => {
      console.log(error)
    })


  }, []) // se ejecuta cuando el componente haya sido creado correctamente (ComponentDidMount)
  
  if (projects === null) {
    return <h3>... buscando data</h3>
  }

  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}
      {projects.map((eachProject) => {
        return (
          <ProjectCard key={eachProject.id} eachProject={eachProject}/>
        )
      })}
       
    </div>
  );
}

export default ProjectListPage;