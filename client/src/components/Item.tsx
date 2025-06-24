// import Card from 'react-bootstrap/Card';
import type { itemProps } from '../utils/interfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Item({ item, lBtnHandler, rBtnHandler, lBtnTxt, rBtnTxt }: itemProps) {
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
        <div
            ref={setNodeRef}
            style={style}
            // bg='info'
            // text='light'
            className=' shadow bg-info text-light row border border-dark rounded mb-1 p-2'
        // className='d-flex justify-content-between'
        >
            <div className='draggable-element col-10 text-start'
                {...attributes}
                {...listeners}
            >
                {task}
            </div>
            <div className='clickable-element col-2'>
                <span onClick={lBtnHandler}>{lBtnTxt}</span>
                {' '}
                <span onClick={rBtnHandler}>{rBtnTxt}</span>
            </div>
        </div>
    )
}
