import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function CreateProduct({onProductCreated}) {
    const { groupid } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(
        {
            product_name: "",
            product_price: "",
            stock: "",
        }
    );

    const handleChange = (e) => {
        const { name,value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await ProtectedFetch(
            `http://127.0.0.1:8000/api/product-group/${groupid}/products`,
            "POST",
            {...product, groupid}
        );

        if (res.ok) {
            alert("Product created succesfully!")
            setProduct({ product_name:"", product_price:"", stock:""});
            navigate("/admin/panel");
        } else {
            alert("Failed to create product.")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create New Product</h1>
            <label>
                <input 
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                <input 
                type="number"
                name="product_price"
                value={product.product_price}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                <input 
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <button type="submit">Create Product</button>
            <button type="button" onClick={() => navigate("/admin/panel")}>
            Cancel
            </button>
        </form>
    );
}

export default CreateProduct;