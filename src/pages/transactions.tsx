import { useEffect, useState } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import CustomModal from "../components/customModal";
import { useBook } from "../context/booksContext";
import { useMember } from "../context/membersContext";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

type TRANSACTION_TYPE = "return" | "borrow";

export interface Transaction {
  id: number;
  book_id: number;
  member_id: number;
  transactionDate: string;
  type: TRANSACTION_TYPE;
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const {bookData} = useBook();
  const {memberData} = useMember();

  const navigate = useNavigate();

  const fetchTransaction = async () => {
    try{
      const response = await axiosInstance(`/transactions`);
      setTransactionData(response.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchTransaction();
  })

  const handleDelete = async ()=> {
    if(selectedTransactionId){
      try{
        await axiosInstance(`/transactions/${selectedTransactionId}`,{
          method: "DELETE",
        });
        setTransactionData((prev)=>
          prev.filter((transaction)=>transaction.id!==selectedTransactionId));
        toast.success("Transaction deleted successfully");
      }catch(error){
        toast.error("Failed to delete transaction");
      }
    };
    setIsModalOpen(false);
  };

  const openModal = (id: number)=>{
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  const closeModal =()=>{
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  }

  const renderBookTitle = (book_id: number) => {
    const book = bookData.find((book) => book.id === book_id);
    return book ? book.title : "Unknown Book";
  };

  const renderMemberName = (member_id: number) => {
    const member = memberData.find((member) => member.id === member_id);
    return member ? member.name : "Unknown Member";
  };

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Transactions</h1>
        <Button
          type="button"
          label="+ Add"
          className="bg-black text-white px-2 text-base cursor-pointer !w-[100px]"
          onClick={() => navigate("/add-transaction")}
        />
      </div>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map((transaction) => (
            <tr
            key={transaction.id}
            className={`bg-white hover:bg-indigo-100 transition-colors`}
          >
            <td className="py-3 px-6 border-b border-gray-200 font-bold text-lg">
              {renderBookTitle(transaction.book_id)}
            </td>
            <td className="py-3 px-6 border-b border-gray-200 font-semibold">
              {renderMemberName(transaction.member_id)}
            </td>
            <td className="py-3 px-6 border-b border-gray-200">
              {transaction.type}
            </td>
            <td className="py-3 px-6 border-b border-gray-200">
              {new Date(transaction.transactionDate).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 border-b border-gray-200 text-center">
              <div className="flex items-center justify-center gap-4">
                <PencilIcon
                    className="text-blue-400 cursor-pointer"
                    size={16}
                    onClick={() =>
                      navigate(`/edit-transaction/${transaction.id}`)
                    }
                  />
                <Trash2Icon
                  className="text-red-400 cursor-pointer"
                  onClick={() => openModal(transaction.id as number)}
                />
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CustomModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}