import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { LOGIN_USER } from '../utils/mutations';
import type { LoginForm } from '../utils/interfaces';
import Auth from '../utils/auth';

export default function Login() {
    const [formData, setFormData] = useState<LoginForm>(
        {
            email: '',
            password: ''
        }
    )
    const [login, { error: loginError }] = useMutation(LOGIN_USER);

    if (loginError) console.log(JSON.stringify(loginError));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('formData: ', formData);

        try {
            const { data: { login: { token } } } = await login({
                variables: { ...formData },
            });

            Auth.login(token);
        } catch (e) {
            console.error(e);
        }

        setFormData({
            email: '',
            password: '',
        });
    };
    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    name='email'
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name='password'
                />
            </Form.Group>
            <Button variant="info" type="submit">
                Submit
            </Button>
        </Form>
    );
}

