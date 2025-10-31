import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedFetch } from "./FetchHelper";

function Auth({ Route }) {
  const [authorized, setAuthorized] = useState(null);
  const bearerToken = localStorage.getItem("sanctum-token");

  useEffect(() => {
    if (!bearerToken) {
      setAuthorized(false);
      return;
    }

    const checkAuth = async () => {
      const response = await ProtectedFetch("http://127.0.0.1:8000/api/admin/authorize", "GET");
      if (response.ok && response.data.authorized) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [bearerToken]);

  if (authorized === null) {
    return <p>Checking authorization...</p>;
  }

  if (authorized) {
    return Route;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default Auth;