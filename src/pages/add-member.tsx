/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Member } from "./members";

const AddMember = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState<Member>();
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);
    const url = id ? `/members/${id}` : "/members";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
        },
      });

      toast.success("Member Added Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate("/members");
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

  const fetchMemberFromId = async () => {
    try {
      const response = await axiosInstance(`/members/${id}`);
      setMemberData({ ...response.data, availability: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemberFromId();
  }, [id]);

  const handleMemberDataChange = (e: any) => {
    const { name, value } = e.target;

    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(memberData);
  };

  return (
    <div className="w-full p-8">
      <div className="flex items-center mb-2 gap-2">
        <ArrowLeftIcon
          onClick={() => navigate("/members")}
          className="cursor-pointer"
        />
        {/* TODO: update title for edit mode */}
        <h1 className="text-2xl font-bold text-center">{id ? "Edit Member" : "Add Member"}</h1>
        <h4 className="text-2xlr">
          {id ? "Edit the details of the member you want to change" :
           "Enter the details of the member you want to add to the database"}
        </h4>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          id="name"
          label="Name"
          value={memberData?.name}
          onChange={handleMemberDataChange}
        />
        <Input
          name="email"
          type="email"
          id="email"
          label="Email"
          value={memberData?.email}
          onChange={handleMemberDataChange}
        />
        <Input
          name="mobile"
          type="text"
          id="mobile"
          label="Mobile"
          value={memberData?.mobile}
          onChange={handleMemberDataChange}
        />
        <Input
          name="address"
          type="text"
          id="address"
          label="Address"
          value={memberData?.address}
          onChange={handleMemberDataChange}
        />
        {errorMessage && (
          <p className="text-red-500 text-lg text-center">{errorMessage}</p>
        )}
        <Button label={id ? "Edit Member" : "Add Member"} type="submit" />
      </form>
    </div>
  );
};

export default AddMember;