import {  useNavigate } from "react-router";
import Button from "../components/button";
import Input from "../components/input";
import { FormEvent } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

const AddBook = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);


    try{
      const response = await axiosInstance("http://localhost:3000/auth/registerBook",{
        headers:{
          "Content-Type":"Application/JSON",
        },
        method: "POST",
        data: formValues,
      });
      navigate("/");
      console.log(response)
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen min-w-100 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register Book
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="title" type="text" id="title" content="Title of the Book" />
          <Input name="author" type="text" id="author" content="Name of the Author" />
          <Input name="quantity" type="number" id="quantity" content="Quantity of Book" />
          {/* Dropdown for availability */}
          <div className="flex flex-col">
            <label htmlFor="availability" className="text-gray-700 font-medium mb-2">
                Is the book available?
            </label>
            <select
                id="availability"
                name="availability"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select availability</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            </div>
            <Button content="Register" type="submit" className="bg-blue-600" />
            </form>
        </div>
    </div>
  );
};

export default AddBook;

