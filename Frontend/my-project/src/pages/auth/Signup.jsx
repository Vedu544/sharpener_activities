import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { signupUser } from "../../api/auth";
import { showError, showSuccess } from "../../utils/toast";
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return errorToast("All fields are required");
    }

    try {
      setLoading(true);
      await signupUser(form);
      showSuccess("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      showError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded-md"
          value={form.name}
          onChange={handleChange}
        />

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

        {loading ? <Loader /> : <Button type="submit">Signup</Button>}

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
