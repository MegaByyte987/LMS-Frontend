import { useState } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import CustomModal from "../components/customModal";
import { useMember } from "../context/membersContext";

export interface FormMember {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  mobile?: string;
}

export interface Member {
  id: number;
  name: string;
  address: string;
  mobile: string;
  email: string;
}

export default function Members() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const {memberData: data, onDelete} = useMember();

  const navigate = useNavigate();

  const handleDelete = async () => {
   if(selectedMemberId){
    onDelete(selectedMemberId);
   }
   setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Members</h1>
        <Button
          type="button"
          label="+ Add Book"
          className="bg-black text-white px-2 text-xs cursor-pointer"
          onClick={() => navigate("/add-member")}
        />
      </div>
      <table className="w-full">
        <thead className="bg-gray-500">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.address}</td>
              <td>{member.email}</td>
              <td>{member.mobile}</td>
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
                    onClick={() => {
                      setSelectedMemberId(member.id?? null);
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