import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc"
    });

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await axios.get("http://localhost:1314/students/get");
                setStudents(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        void getStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:1314/students/delete?id=${id}`
            );

            if (response.status === 200) {
                setStudents((prev) =>
                    prev.filter((student) => student.studentId !== id)
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    const sortData = (key) => {
        let direction = "asc";

        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        setSortConfig({ key, direction });

        const sorted = [...students].sort((a, b) => {
            if (typeof a[key] === "number") {
                return direction === "asc"
                    ? a[key] - b[key]
                    : b[key] - a[key];
            } else {
                return direction === "asc"
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });

        setStudents(sorted);
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return "<>";
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    return (
        <>
            <nav>
                <a onClick={() => navigate("/dashboard")}>Dashboard</a>
                <a onClick={() => navigate("/add")}>Add Student</a>
                <a onClick={() => navigate("/view")}>View Students</a>
                <a onClick={() => navigate("/logout")}>Logout</a>
            </nav>

            <br />

            <div className="table">
                <h3>Students Details</h3>

                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sortData("name")}>
                                Name <span>{renderSortIcon("name")}</span>
                            </th>

                            <th onClick={() => sortData("studentId")}>
                                ID <span>{renderSortIcon("studentId")}</span>
                            </th>

                            <th onClick={() => sortData("cgpa")}>
                                CGPA <span>{renderSortIcon("cgpa")}</span>
                            </th>

                            <th onClick={() => sortData("branch")}>
                                Branch <span>{renderSortIcon("branch")}</span>
                            </th>

                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.studentId}>
                                <td>{student.name}</td>
                                <td>{student.studentId}</td>
                                <td>{student.cgpa}</td>
                                <td>{student.branch}</td>
                                <td>
                                    <a onClick={() =>
                                        navigate(`/edit?id=${student.studentId}`)
                                    }>
                                        Edit
                                    </a>
                                    {" | "}
                                    <a onClick={() => handleDelete(student.studentId)}>
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}