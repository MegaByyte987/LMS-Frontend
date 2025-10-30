import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { LucideArrowLeft } from "lucide-react";
import { useBook } from "../context/booksContext";
import { useMember } from "../context/membersContext";

type TRANSACTION_TYPE = "return" | "borrow";

export interface Transaction {
  id?: number;
  book_id?: number;
  member_id?: number;
  transactionDate?: string;
  type?: TRANSACTION_TYPE;
}

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [errorMessage, setErrorMessage] = useState("");
  const { bookData } = useBook();
  const {memberData} = useMember();

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);
    const url = id ? `/transactions/${id}` : "/transactions";
    const transactionDate = new Date(parsedFormValues.transactionDate);
    if(isNaN(transactionDate.getTime())){
      toast.error("Invalid date format");
      return;
    }

    console.log(parsedFormValues);

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          book_id: parseInt(parsedFormValues.book_id, 10),
          member_id: parseInt(parsedFormValues.member_id, 10),
          transactionDate,
        },
      });

      toast.success("Transaction Added Successfully");
      // updateTransaction(parsedFormValues);
      navigate("/transactions");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again");
    }
  };

  const fetchTransactionFromId = async () => {
    try {
      const response = await axiosInstance(`/transactions/${id}`);
      setTransactionData({ ...response.data, availability: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionFromId();
  }, [id]);

  const handleTransactionDataChange = (e: any) => {
    const { name, value } = e.target;

    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col h-screen w-full p-4 items-center">
      <div className="w-full flex items-center justify-start mb-2 gap-2">
        <LucideArrowLeft
          onClick={() => navigate("/transactions")}
          className="cursor-pointer text-gray-500"
        />
        <h1 className="text-sm text-gray-500 text-center">
          Back to Transactions
        </h1>
      </div>
      <div className="flex flex-col w-[600px] shadow-lg p-4 gap-4 mt-4 bg-white rounded-md">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">{id ? "Update Transaction" : "Add Transaction"}</h1>
          <p className="text-gray-400">
            {id ? "Enter the details of the transaction that you want to change." :
             "Enter the details of the transaction you want to add to your collection."}
            
          </p>
        </div>
        <form className="space-y-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="book"
              className="block text-lg font-bold text-gray-700"
            >
              Book
            </label>
            <select
              id="book"
              name="book_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
            >
              {bookData.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          {/* TODO: add Member dropdown */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="book"
              className="block text-lg font-bold text-gray-700"
            >
              Member
            </label>
            <select
              id="member"
              name="member_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
            >
              {memberData.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="type"
              className="block text-lg font-bold text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
            >
              <option value={"borrow"}>Borrow</option>
              <option value={"return"}>Return</option>
            </select>
          </div>
          <Input
            name="transactionDate"
            type="date"
            id="date"
            label="Date"
            required={false}
            value={transactionData?.transactionDate}
            onChange={handleTransactionDataChange}
          />
          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Button
            label={id ? "Update Transaction" : "Add Transaction"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;