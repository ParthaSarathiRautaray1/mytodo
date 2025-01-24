import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true,

    },
})

export const Todo = mongoose.model("Todo", todoSchema)