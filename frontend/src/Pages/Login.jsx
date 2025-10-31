import { useState } from 'react'
import { Fetch } from '../Components/FetchHelper';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let response = await Fetch("http://127.0.0.1:8000/api/admin/login", "post", data);
            if (response.ok && response.status === 200) {
                localStorage.setItem("sanctum-token", response.data.token)
                return navigate("/admin/panel", {replace: true}) 
            }

            setError(response.data.errors.credentials)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <h1>Login page</h1>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" required={true} name="email" id="email" placeholder="email" value={data.email} onChange={handleChange}/><br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required={true} placeholder="password" value={data.password} onChange={handleChange}/><br />
            <button type='submit'>Login</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
    </>)
}

export default Login;