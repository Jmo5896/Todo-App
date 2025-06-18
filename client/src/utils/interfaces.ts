import { UniqueIdentifier } from '@dnd-kit/core';

export type tabs = '/' | '/login' | '/signup';
export interface LoginForm {
    email: string;
    password: string;
    username?: string;
}

// TESTING THIS WILL PROBABLY NEED TO BE CHANGED
export type Todo = {
    id: UniqueIdentifier;
    task: string;
    completed: number;
}

export interface itemProps {
    item: Todo;
    toPending: (e: MouseEvent) => void;
    removeItem: (e: MouseEvent) => void;
}