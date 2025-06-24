import { Modal, Button, Form } from 'react-bootstrap';
import { createTodoProps } from '../utils/interfaces';

export default function CreateTodoModal({ show, handleClose, createItem }: createTodoProps) {


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Let's Add a Todo!</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createItem}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="task">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control name='task' type="text" placeholder="Enter todo..." />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type='submit'>
                        Add Todo
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
