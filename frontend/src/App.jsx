import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fetch } from "./Components/FetchHelper";
import ProductItem from "./Components/ProductItem";

function App() {
  const [productGroups, setProductGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchData = async () => {
      const response = await Fetch("http://127.0.0.1:8000/api/product-group", "GET");
      if (response.ok && isMounted) {
        setProductGroups(response.data);
      } else if (isMounted) {
        setError(response.error || new Error("Failed to load product groups"));
      }
      if (isMounted) setLoading(false);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <button onClick={() => navigate(`/admin/panel/product-group/create`)}>Create Group</button>
      {productGroups?.product_groups && Object.entries(productGroups.product_groups).map(([key, value]) => (
        <div key={key}>
          <h1>{value.name}</h1>
          {value.description && <p>{value.description}</p>}
          <button onClick={() => navigate(`/admin/panel/product-group/${value.id}/edit`)}>
            {loadingGroups[value.id] ? "Loading..." : "Edit"}
          </button>
          <button onClick={() => navigate(`/admin/panel/product-group/${value.id}/delete`)}>
            {loadingGroups[value.id] ? "Loading..." : "Delete"}
          </button>
          <button onClick={() => handleProductFetch(key, value.id)} disabled={loadingGroups[value.id]}>
            {loadingGroups[value.id] ? "Loading..." : "Show Products"}
          </button>
          <p>Created: {new Date(value.created_at).toLocaleString()}</p>
          <p>Updated: {new Date(value.updated_at).toLocaleString()}</p>
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
              <button onClick={() => navigate(`/admin/panel/${value.id}/create/product`)}>
                Create Product
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default App;