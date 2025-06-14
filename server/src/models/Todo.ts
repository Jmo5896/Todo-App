import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
    task: string;
    completed: boolean;
}

const todoSchema = new Schema<ITodo>(
    {
        task: {
            type: String,
            required: true,
            trim: true,
            minLength: [1, "Don't make a blank task."]
        },
        completed: {
            type: Boolean,
            required: false,
            default: false
        }

    },
    {
        timestamps: true
    }
);



const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
