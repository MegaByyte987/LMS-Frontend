import { useState } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import CustomModal from "../components/customModal";
import { useBook } from "../context/booksContext";

export interface FormBook {
  id?: number;
  title?: string;
  author?: string;
  quantity?: number;
  availability?: boolean;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
  availability: boolean;
}

export default function Books() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const {bookData: data, onDelete} = useBook();

  const navigate = useNavigate();

  const handleDelete = async () => {
   if(selectedBookId){
    onDelete(selectedBookId);
   }
   setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Books</h1>
        <Button
          type="button"
          label="+ Add Book"
          className="bg-black text-white px-2 text-xs cursor-pointer"
          onClick={() => navigate("/add-book")}
        />
      </div>
      <table className="w-full">
        <thead className="bg-gray-500">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>{book.availability ? "Yes" : "No"}</td>
              <td>
                <div className="flex gap-4 items-center justify-center">
                  <PencilIcon
                    className="text-blue-400 cursor-pointer"
                    size={16}
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                  />
                  <Trash2Icon
                    className="text-red-400 cursor-pointer"
                    size={16}
                    onClick={() => {
                      setSelectedBookId(book.id);
                      setIsModalOpen(true);
                    }}
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