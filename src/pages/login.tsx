import { FormEvent, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInterceptor";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(null);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

    try {
      const response = await axiosInstance(`/auth/loginUser`, {
        method: "POST",
        data: formValues,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log(response);
      toast("Welcome!!", {
        type: "success",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast("Something went wrong! Please try again!!", {
        type: "error",
      });
      setError(err?.response?.data?.message ?? "Unexpected error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="username" type="text" id="username" content="Username" />
          <Input
            name="password"
            type="password"
            id="password"
            content="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button content="Login" type="submit" className="bg-blue-600" />
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <NavLink
            className="text-blue-400 ml-1 hover:underline"
            to="/register"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
