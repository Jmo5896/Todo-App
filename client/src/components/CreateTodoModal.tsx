import { Modal, Button } from 'react-bootstrap';
import { createTodoProps } from '../utils/interfaces';

export default function CreateTodoModal({ show, handleClose, createItem }: createTodoProps) {


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createItem}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
