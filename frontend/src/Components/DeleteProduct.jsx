import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function DeleteProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteProduct = async (e) => {
        try {
            const res = await ProtectedFetch(
                `http://127.0.0.1:8000/api/products/${id}`,
                "DELETE"
            );

            if (res.ok) {
                alert("Product deleted succesfully!");
            } else {
                alert("Failed to delte product");
            }
        } catch (error) {
            alert("error occured please try again!");
            console.log(error);
        }
        navigate("/admin/panel");
    };

    deleteProduct();

    return <p>Deleting Product...</p>;
}

export default DeleteProduct;