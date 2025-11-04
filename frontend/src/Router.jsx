import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import App from "./App";
import Auth from "./Components/Auth";
import EditProduct from "./Components/EditProduct";
import CreateProduct from "./Components/CreateProduct";
import DeleteProduct from "./Components/DeleteProduct";
import CreateGroup from "./Components/CreateGroup";
import EditGroup from "./Components/EditGroup";
import DeleteGroup from "./Components/DeleteGroup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/panel" element={<Auth Route={<App />} />} />
        <Route path="/admin/panel/post/:id" element={<Auth Route={<EditProduct />} />} />
        <Route path="/admin/panel/:groupid/create/product" element={<Auth Route={<CreateProduct />} />} />
        <Route path="/admin/panel/post/:id/delete" element={<Auth Route={<DeleteProduct />} />} />
        <Route path="/admin/panel/product-group/create" element={<Auth Route={<CreateGroup />} />} />
        <Route path="/admin/panel/product-group/:groupid/edit" element={<Auth Route={<EditGroup />} />} />
        <Route path="/admin/panel/product-group/:groupid/delete" element={<Auth Route={<DeleteGroup />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;