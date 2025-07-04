import {
  Todo,
  User,
} from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}


const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('todos')
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {

      const user = await User.create({ ...input });

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },

    createTodo: async (_parent: any, { task }: any, context: any) => {
      if (context.user) {
        const newItem = await Todo.create({ task });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { todos: newItem._id } }
        );

        return newItem;
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    changeTodoOrder: async (_parent: any, { todos }: any, context: any) => {
      if (context.user) {

        if (todos.length > 0) {

          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $set: { todos } }
          );

          return "order was updated!";
        }
        throw new Error("no order to adjust");
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    toPending: async (_parent: any, { todoId }: any, context: any) => {
      if (context.user) {

        await Todo.findOneAndUpdate(
          { _id: todoId },
          { completed: 1 }
        )

        return await User.findOne({ _id: context.user._id }).populate('todos');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    undoPending: async (_parent: any, { todoId }: any, context: any) => {
      if (context.user) {

        await Todo.findOneAndUpdate(
          { _id: todoId },
          { completed: 0 }
        )

        return await User.findOne({ _id: context.user._id }).populate('todos');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    completeTask: async (_parent: any, { todoId }: any, context: any) => {
      if (context.user) {

        await Todo.findOneAndUpdate(
          { _id: todoId },
          { completed: 2 }
        )

        return await User.findOne({ _id: context.user._id }).populate('todos');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
};

export default resolvers;
