import { UniqueIdentifier } from '@dnd-kit/core';
import { MouseEvent } from 'react';


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
    lBtnHandler: (e: MouseEvent<HTMLSpanElement>) => void;
    rBtnHandler: (e: MouseEvent<HTMLSpanElement>) => void;
    lBtnTxt: string;
    rBtnTxt: string;
}