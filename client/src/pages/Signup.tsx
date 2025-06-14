import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ADD_USER } from '../utils/mutations';
import type { LoginForm } from '../utils/interfaces';
import Auth from '../utils/auth';

export default function Signup() {
    const [formData, setFormData] = useState<LoginForm>(
        {
            username: '',
            email: '',
            password: ''
        }
    )
    const [addUser, { error: addUserError }] = useMutation(ADD_USER);

    if (addUserError) console.log(JSON.stringify(addUserError));

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
            const { data: { addUser: { token } } } = await addUser({
                variables: { input: { ...formData } },
            });

            Auth.login(token);
        } catch (e) {
            console.error(e);
        }

        setFormData({
            username: '',
            email: '',
            password: '',
        });
    };
    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={handleChange}
                    name='username'
                />
            </Form.Group>
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

