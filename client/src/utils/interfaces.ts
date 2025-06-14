export type tabs = '/' | '/login' | '/signup';

export interface LoginForm {
    email: string;
    password: string;
    username?: string;
}