import Card from 'react-bootstrap/Card';
import type { itemProps } from '../utils/interfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
        transition
    };

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            bg='info'
            text='light'
        >
            <Card.Body>{task}</Card.Body>
        </Card>
    )
}
