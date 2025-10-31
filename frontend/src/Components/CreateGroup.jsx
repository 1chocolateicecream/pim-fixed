import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function CreateProductGroup() {
    const navigate = useNavigate();
    const [group, setGroup] = useState({
        product_group_name: "",
    });

    const handleChange = (e) => {
        const { name,value } = e.target;
        setGroup((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await ProtectedFetch(
            "http://127.0.0.1:8000/api/product-group",
            "POST",
            group
        );

        if (res.ok) {
            alert("Product group created successfully!");
            setGroup({ product_group_name: "" });
            navigate("/admin/panel")
        } else {
            alert("Failed to create product group!")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create New Product Group</h1>
            <label>
                Group Name:
                <input 
                type="text"
                name="product_group_name" 
                value={group.product_group_name}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <button type="submit">Create Group</button>
            <button type="button" onClick={() => navigate("/admin/panel")}>
                Cancel
            </button>
        </form>
    );

}

export default CreateProductGroup;