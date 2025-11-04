import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function DeleteProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteProduct = async () => {
            try {
                const res = await ProtectedFetch(
                    `http://127.0.0.1:8000/api/products/${id}`,
                    "DELETE"
                );

                if (res.ok) {
                    alert("Product deleted successfully!");
                } else {
                    alert("Failed to delete product.");
                }
            } catch (error) {
                alert("An error occurred, please try again!");
                console.log(error);
            }
            navigate("/admin/panel");
        };

        deleteProduct();
    }, [id, navigate]);

    return <p>Deleting product...</p>;
}

export default DeleteProduct;