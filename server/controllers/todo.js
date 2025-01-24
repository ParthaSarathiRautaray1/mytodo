import { Todo } from "../models/todo.js";


export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(403).json({
                success: false,
                message: "All field required.",
            })
        }
        const todo = await Todo.create({
            title,
            description
        })
        return res.status(200).json({
            success: true,
            message: "Todo created Successfully.",
            todo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            todos
        })
    } catch (error) {
        console.log(error);

    }

}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body; // get the updated details by user from frontend


        const updatedTodo = await Todo.findByIdAndUpdate(
            id,  //  1st argument:  which todo to update  
            {
                title,
                description
            },  // 2nd argument : update the old details

            { new: true } // 3rd argument : this will return the updated document
        )

        if(!updatedTodo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo: updatedTodo
        });

    } catch (error) {
        console.log(error);

    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if(!deletedTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found."
            });
        }

        return res.status(200).json({
            success:true,
            message:"Todo deleted Successfully.",
            deletedTodo
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        
    }
}