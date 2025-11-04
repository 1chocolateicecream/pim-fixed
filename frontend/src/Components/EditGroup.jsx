import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function EditProductGroup() {
    const { groupid } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGroup = async () => {
            const res = await ProtectedFetch(
            `http://127.0.0.1:8000/api/product-group/${groupid}`,
            "GET"
            );
            if (res.ok) {
                const groupData = res.data.product_groups || res.data;
                setGroup({
                    name: groupData.name || "",
                    description: groupData.description || ""
                });
            } else {
                setError(res.error);
            }
            setLoading(false);
        };
        loadGroup();
    }, [groupid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroup((prev) => ({ ...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await ProtectedFetch(
            `http://127.0.0.1:8000/api/product-group/${groupid}`,
            "PUT",
            group
        );

        if (res.ok) {
            alert("Product group updated successfully!");
            navigate("/admin/panel");
        } else {
            alert("Failed to update product group!")
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading group.</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Product Group #{groupid}</h1>
            <label>
                Group Name:
                <input
                type="text"
                name="name"
                value={group.name}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                name="description"
                value={group.description}
                onChange={handleChange}
                rows="4"
                />
            </label>
            <br />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => navigate("/admin/panel")}>
                Cancel
            </button>
        </form>
    );
}

export default EditProductGroup;