import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "../shadcncomponent/ui/input";
import { Textarea } from "../shadcncomponent/ui/textarea";
import { Button } from "../shadcncomponent/ui/button";
import axios from "axios";
import { useToast } from "../shadcncomponent/ui/use-toast";
import { Card, CardContent } from "../shadcncomponent/ui/card";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { toast } = useToast();

  const [todos, setTodos] = useState([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
          className: "success",
        });
        fetchTodo();
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred during todo creation",
        variant: "destructive",
      });
    } finally {
      setTitle(""), setDescription("");
    }
  };


  const fetchTodo = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo/");
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);
 
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center w-1/2 gap-5  p-5 m-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" ml-96 border-b-indigo-400 ring-0 focus-visible:ring-0"
          type="text"
          placeholder="Your todo title ."
        />
      </div>
      <div className="flex justify-center items-center gap-5">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-1/2 resize-none ring-0 focus-visible:ring-0"
          rows={8}
          placeholder="your todo description."
        />
        <Button
          onClick={addTodoHandler}
          className="whitespace-nowrap min-w-[100px]"
        >
          Add todo
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-5 mt-5 m-10 p-5 ">
        {todos.map((todo) => (
          <Card className="bg-red-400" key={todo._id}>
            <CardContent>
              <h1 className="font-bold font-[Poppins] text-xl mt-2 text-white">{todo.title}</h1>
              <p className="font-semibold text-sm font-[Poppins] mt-3 text-white">{todo.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
