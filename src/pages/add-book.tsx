import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { FormBook } from "./books";

const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<FormBook>();
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);
    const url = id ? `/books/${id}` : "/books";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          quantity: parseInt(parsedFormValues?.quantity, 10),
          availability: parsedFormValues?.availability === "on",
        },
      });

      toast.success("Book Added Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate("/books");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchBookFromId = async () => {
    try {
      const response = await axiosInstance(`/books/${id}`);
      console.log(response.data)
      setBookData({ ...response.data, availability: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookFromId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBookDataChange = (e: any) => {
    const { name, value, checked } = e.target;

    setBookData((prevData) => ({
      ...prevData,
      [name]: name === "availability" ? checked : value,
    }));
    console.log(bookData);
  };

  return (
    <div className="w-full p-8 bg-gray-300">
      <div className="flex items-center mb-2 gap-2">
        <ArrowLeftIcon
          onClick={() => navigate("/books")}
          className="cursor-pointer w-fit"
        />
      </div>
      <form className="space-y-4 w-100 max-w-md mx-auto mt-10 p-6 rounded-xl bg-white shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl">
          {id ? "Edit Book" : "Add Book"}
        </h1>
        <h4 className="text-2xlr">
          {id ? "Edit the details of the book" : "Enter the details of the book"}
        </h4>
        <Input
          name="title"
          type="text"
          id="title"
          label="Title"
          value={bookData?.title}
          onChange={handleBookDataChange}
        />
        <Input
          name="author"
          type="text"
          id="author"
          label="Author"
          value={bookData?.author}
          onChange={handleBookDataChange}
        />
        <Input
          name="quantity"
          type="number"
          id="quantity"
          label="Quantity"
          value={bookData?.quantity}
          onChange={handleBookDataChange}
        />
        <div className="flex items-center ">
          <label
            htmlFor="availability"
            className=" text-gray-700 text-sm font-bold "
          >
            Availability:
          </label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            className="mx-3 size-5 h-4 w-4 text-black border-gray-300 rounded"
            onChange={handleBookDataChange}
            checked={bookData?.availability}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-lg text-center">{errorMessage}</p>
        )}
        <Button label={id ? "Edit Book" : "Add Book"} type="submit" />
      </form>
    </div>
  );
};

export default AddBook;