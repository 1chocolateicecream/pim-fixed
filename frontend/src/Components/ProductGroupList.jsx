import { useState } from "react";
import { Fetch } from "./FetchHelper";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

function ProductGroupList({ productGroups, setProductGroups }) {
  const [loadingGroups, setLoadingGroups] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  const handleProductFetch = async (key, ID) => {
    if (expandedGroups[ID]) {
      setExpandedGroups((prev) => ({ ...prev, [ID]: false }));
      return;
    }

    if (productGroups.product_groups[key]?.products?.length > 0) {
      setExpandedGroups((prev) => ({ ...prev, [ID]: true }));
      return;
    }

    setLoadingGroups((prev) => ({ ...prev, [ID]: true }));
    const response = await Fetch(`http://127.0.0.1:8000/api/product-group/${ID}`, "GET");
    if (response.ok) {
      const dataVar = response.data;
      setProductGroups((prev) => ({
        ...prev,
        product_groups: {
          ...prev.product_groups,
          [key]: {
            ...prev.product_groups[key],
            products: dataVar.product_groups.products || [],
          },
        },
      }));
      setExpandedGroups((prev) => ({ ...prev, [ID]: true }));
    }
    setLoadingGroups((prev) => ({ ...prev, [ID]: false }));
  };

  return (
    <>
      <button onClick={() => navigate(`/admin/panel/product-group/create`)}>Create Group</button>
      {Object.entries(productGroups.product_groups).map(([key, value]) => (
        <div key={key}>
          <h1>{value.product_group_name}</h1>
          <button onClick={() => navigate(`/admin/panel/product-group/${value.id}/edit`)}>
            {loadingGroups[value.id] ? "Loading..." : "Edit"}
          </button>
          <button onClick={() => navigate(`/admin/panel/product-group/${value.id}/delete`)}>
            {loadingGroups[value.id] ? "Loading..." : "Delete"}
          </button>
          <p>Created: {new Date(value.created_at).toLocaleString()}</p>
          <p>Updated: {new Date(value.updated_at).toLocaleString()}</p>
          <button onClick={() => navigate(`/admin/panel/${value.id}/create/product`)}>
            {loadingGroups[value.id] ? "Loading..." : "Create Products"}
          </button>
          <button onClick={() => handleProductFetch(key, value.id)} disabled={loadingGroups[value.id]}>
            {loadingGroups[value.id] ? "Loading..." : "Show Products"}
          </button>
          {expandedGroups[value.id] && (
            <div>
              {value.products && value.products.length > 0 ? (
                value.products.map((product) => (
                  <div key={product.id}>
                    <ProductItem product={product} />
                    <button onClick={() => navigate(`/admin/panel/post/${product.id}/delete`)}>Delete</button>
                    <button onClick={() => navigate(`/admin/panel/post/${product.id}`)}>Edit</button>
                  </div>
                ))
              ) : (
                <p>No products in this group.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default ProductGroupList;