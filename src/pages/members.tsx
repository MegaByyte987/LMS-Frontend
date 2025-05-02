import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import Button from "../components/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";

export interface Member {
  id?: number;
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
}

export default function Members() {
  const [data, setData] = useState<Member[]>([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance("/members");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // runs fetchBooks() once on page load

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Members</h1>
        
        <Button
          type="button"
          label="+ Add Member"
          className="bg-black text-white px-2 text-xs cursor-pointer"
          onClick={() => navigate("/add-member")}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr key={member.id}>
              <td>{member?.name}</td>
              <td>{member?.email}</td>
              <td>{member?.mobile}</td>
              <td>{member?.address}</td>
              <td>
                <div className="flex gap-4 items-center justify-center">
                  <PencilIcon
                    className="text-blue-400 cursor-pointer"
                    size={16}
                    onClick={() => navigate(`/edit-member/${member.id}`)}
                  />
                  <Trash2Icon
                    className="text-red-400 cursor-pointer"
                    size={16}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}