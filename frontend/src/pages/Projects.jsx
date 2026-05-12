import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

export default function Projects() {

    const { workspaceId } = useParams();

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        workspace: workspaceId
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {

        try {

            const response = await api.get(
                "/projects/"
            );

            const filteredProjects =
                response.data.results.filter(
                    (project) =>
                        project.workspace == workspaceId
                );

            setProjects(filteredProjects);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/projects/",
                formData
            );

            setFormData({
                name: "",
                description: "",
                workspace: workspaceId
            });

            fetchProjects();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container">

            <h1>Projects</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea className="input"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <button className="button" type="submit">
                    Create Project
                </button>

            </form>

            <hr />

            {
                projects.map((project) => (

                    <div
                        key={project.id}

                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "10px",
                            cursor: "pointer"
                        }}

                        onClick={() =>
                            navigate(`/tasks/${project.id}`)
                        }
                    >

                        <h3>{project.name}</h3>

                        <p>{project.description}</p>

                    </div>
                ))
            }

        </div>
    );
}