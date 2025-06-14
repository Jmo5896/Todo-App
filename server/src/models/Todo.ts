import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
    task: string;
    completed: number;
}

const todoSchema = new Schema<ITodo>(
    {
        task: {
            type: String,
            required: true,
            trim: true,
            minLength: [1, "Don't make a blank task."]
        },
        // 0 = incomplete, 1 = pending, 2 = complete
        completed: {
            type: Number,
            required: false,
            default: 0,
            max: 2
        }

    },
    {
        timestamps: true
    }
);



const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
