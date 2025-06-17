import Card from 'react-bootstrap/Card';
import type { User } from '../utils/interfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Item(props: { item: User }) {
    const { item } = props;
    const { id, name, email } = item;
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
            <Card.Body>Employee Number: {id}, name: {name}, email: {email}. </Card.Body>
        </Card>
    )
}
