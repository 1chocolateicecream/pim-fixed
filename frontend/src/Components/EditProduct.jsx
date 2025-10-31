import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ product_name: "", product_price: "", stock: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await ProtectedFetch(`http://127.0.0.1:8000/api/products/${id}`, "GET");
      if (res.ok) {
        const p = res.data.product || {};
        setProduct({
          product_name: p.product_name ?? "",
          product_price: p.product_price ?? "",
          stock: p.stock ?? "",
        });
      } else {
        setError(res.error);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await ProtectedFetch(`http://127.0.0.1:8000/api/products/${id}`, "PUT", product);
    if (res.ok) {
      alert("Product updated successfully!");
      navigate("/admin/panel");
    } else {
      alert("Failed to update product.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Product #{id}</h1>
      <label>
        Name:
        <input type="text" name="product_name" value={product.product_name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="product_price" value={product.product_price} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Stock:
        <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => navigate("/admin/panel")}>Cancel</button>
    </form>
  );
}

export default EditProduct;
