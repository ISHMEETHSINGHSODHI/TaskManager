import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Workspace() {
    

    const navigate = useNavigate();

    const [workspaces, setWorkspaces] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    // Separate email state for each workspace
    const [memberEmails, setMemberEmails] = useState({});

    useEffect(() => {
        fetchWorkspaces();
    }, []);

const fetchWorkspaces = async () => {

    try {

        const response = await api.get(
            "/workspaces/"
        );

        console.log(response.data);

        // Handle both paginated and non-paginated responses
        if (Array.isArray(response.data)) {

            setWorkspaces(response.data);

        } else {

            setWorkspaces(
                response.data.results || []
            );
        }

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
                "/workspaces/",
                formData
            );

            setFormData({
                name: "",
                description: ""
            });

            fetchWorkspaces();

        } catch (error) {

            console.log(error);
        }
    };

const addMember = async (workspaceId) => {

    try {

        console.log(
            memberEmails[workspaceId]
        );

        await api.post(
            `/workspaces/${workspaceId}/add_member/`,
            {
                email: memberEmails[workspaceId],
                role: "MEMBER"
            }
        );

        alert("Member added successfully");

    } catch (error) {

        console.log(error);

        console.log(error.response);

        alert("Failed to add member");
    }
};
    return (

        <div className="container">

            <h1>Workspaces</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Workspace Name"
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
                    Create Workspace
                </button>

            </form>

            <hr />

            {
                Array.isArray(workspaces) && workspaces.map((workspace) => (

                    <div
                        key={workspace.id}
                        className="card"
                        // style={{
                        //     border: "1px solid gray",
                        //     padding: "10px",
                        //     marginBottom: "20px"
                        // }}
                    >

                        {/* Clickable workspace section */}

                        <div
                            style={{
                                cursor: "pointer"
                            }}

                            onClick={() =>
                                navigate(
                                    `/projects/${workspace.id}`
                                )
                            }
                        >

                            <h3>{workspace.name}</h3>

                            <p>
                                {workspace.description}
                            </p>

                        </div>

                        <hr />

                        <h4>Add Member</h4>

                        <input
                            type="email"
                            placeholder="User Email"

                            value={
                                memberEmails[workspace.id] || ""
                            }

                            onChange={(e) =>
                                setMemberEmails({
                                    ...memberEmails,
                                    [workspace.id]:
                                    e.target.value
                                })
                            }
                        />

                        <button
                            onClick={() =>
                                addMember(workspace.id)
                            }
                        >
                            Add Member
                        </button>

                    </div>
                ))
            }

        </div>
    );
}


