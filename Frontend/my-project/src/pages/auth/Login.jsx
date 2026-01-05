import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { showError, showSuccess } from "../../utils/toast";



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return showError("All fields are required");
    }

    try {
      setLoading(true);
    await login({
      email: form.email,
      password: form.password,
      
    });
    } catch (err) {
      showError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-red-500 p-6 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md"   
          value={form.password}
          onChange={handleChange}
        />

        {loading ? <Loader /> : <Button type="submit">Login</Button>}

        <div className="text-sm text-center space-y-1">
          <Link to="/forgot-password" className="text-blue-600">
            Forgot password?
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
