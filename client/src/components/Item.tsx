// import Card from 'react-bootstrap/Card';
import type { itemProps } from '../utils/interfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'react-bootstrap';

export default function Item({ item, toPending, removeItem }: itemProps) {
    const { id, task } = item;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            bg='info'
            text='light'
            className='draggable-element'
        >
            <Card.Body className='d-flex justify-content-between'>
                <span>{task}</span>
                <div className='clickable-element'>
                    <span>✔</span>
                    {' '}
                    <span>❌</span>
                </div>
            </Card.Body>
        </Card>
    )
}
