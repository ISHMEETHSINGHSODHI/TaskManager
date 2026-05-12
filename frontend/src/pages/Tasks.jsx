import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";

export default function Tasks() {

    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);

    const [comments, setComments] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "TODO",
        project: projectId
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {

        try {

            const response = await api.get(
                "/tasks/"
            );

            const filteredTasks =
                response.data.results.filter(
                    (task) =>
                        task.project == projectId
                );

            setTasks(filteredTasks);

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
                "/tasks/",
                formData
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const updateStatus = async (
        taskId,
        newStatus
    ) => {

        try {

            const task =
                tasks.find(
                    (t) => t.id === taskId
                );

            await api.put(
                `/tasks/${taskId}/`,
                {
                    ...task,
                    status: newStatus
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const addComment = async (taskId) => {

        try {

            await api.post(
                "/comments/",
                {
                    task: taskId,
                    content: comments[taskId]
                }
            );

            setComments({
                ...comments,
                [taskId]: ""
            });

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="container">

            <h1>Tasks</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="priority"
                    onChange={handleChange}
                >

                    <option value="LOW">
                        LOW
                    </option>

                    <option value="MEDIUM">
                        MEDIUM
                    </option>

                    <option value="HIGH">
                        HIGH
                    </option>

                </select>

                <br /><br />

                <button type="submit">
                    Create Task
                </button>

            </form>

            <hr />

            {
                tasks.map((task) => (

                    <div
                        key={task.id}

                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            marginBottom: "20px"
                        }}
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            Priority:
                            {task.priority}
                        </p>

                        <p>
                            Status:
                            {task.status}
                        </p>

                        <select
                            value={task.status}

                            onChange={(e) =>
                                updateStatus(
                                    task.id,
                                    e.target.value
                                )
                            }
                        >

                            <option value="TODO">
                                TODO
                            </option>

                            <option value="IN_PROGRESS">
                                IN PROGRESS
                            </option>

                            <option value="DONE">
                                DONE
                            </option>

                        </select>

                        <hr />

                        <h4>Comments</h4>

                        {
                            task.comments.map(
                                (comment) => (

                                <div
                                    key={comment.id}
                                >

                                    <p>
                                        {comment.content}
                                    </p>

                                </div>
                            ))
                        }

                        <input className="input"
                            type="text"
                            placeholder="Add comment"

                            value={
                                comments[task.id] || ""
                            }

                            onChange={(e) =>
                                setComments({
                                    ...comments,
                                    [task.id]:
                                        e.target.value
                                })
                            }
                        />

                        <button className="button"
                            onClick={() =>
                                addComment(task.id)
                            }
                        >
                            Add
                        </button>

                    </div>
                ))
            }

        </div>
    );
}