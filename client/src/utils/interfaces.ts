export type tabs = '/' | '/login' | '/signup';

export interface LoginForm {
    email: string;
    password: string;
    username?: string;
}

// TESTING THIS WILL PROBABLY NEED TO BE CHANGED
export type User = {
    id: number;
    name: string;
    email: string;
}