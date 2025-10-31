import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function DeleteProductGroup() {
    const { groupid } = useParams();
    const navigate = useNavigate();

    const deleteGroup = async () => {
        try {
            const res = await ProtectedFetch(
                `http://127.0.0.1:8000/api/product-group/${groupid}`,
                "DELETE"
            );

            if (res.ok) {
                alert("Product group deleted succesfully!")
            } else {
                alert("Failed to delete product group!")
            }
        } catch (error) {
            alert("An error occured, please try again!")
            console.log(error);
        }

        navigate("/admin/panel");
    };

    deleteGroup();

    return <p>Deleteing product group...</p>
}

export default DeleteProductGroup;