import React from "react";
import { Button } from "../shadcncomponent/ui/button";
import axios from "axios";
import { useToast } from "../shadcncomponent/ui/use-toast";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      console.log("Logout response:", res.data);

      if (res.data.success) {
        
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
          className: "success",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="bg-gray-600 p-5 m-10 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-[Poppins]">My Todo</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;
