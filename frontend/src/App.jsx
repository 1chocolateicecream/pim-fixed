import { useEffect, useState } from "react";
import ProductGroupList from "./Components/ProductGroupList";
import { Fetch } from "./Components/FetchHelper";

function App() {
  console.log(localStorage.getItem("sanctum-token"));
  const [productGroups, setProductGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {productGroups?.product_groups && (
        <ProductGroupList productGroups={productGroups} setProductGroups={setProductGroups} />
      )}
    </>
  );
}

export default App;