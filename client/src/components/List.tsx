import { useState, useEffect, MouseEvent } from 'react';
import Item from './Item';
import type { Todo } from '../utils/interfaces';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

export default function List() {
    const [todoData, setTodoData] = useState<Todo[]>([])

    const { error: meError, data: meData } = useQuery(QUERY_ME)

    if (meError) {
        console.log(JSON.stringify(meError));
    }

    const freshTodos = meData?.me.todos || [];

    useEffect(() => {
        setTodoData(freshTodos)
    }, [freshTodos])


    const handleDragEnd = (e: DragEndEvent) => {
        e.activatorEvent.stopPropagation();
        const { active, over } = e;
        console.log(e);


        if (over && active.id !== over.id) {
            setTodoData(items => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);

            })
        }

    }

    const toPending = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = e.target;
        console.log("toPending: ", currentItem);

    };
    const toTodo = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = e.target;
        console.log("toTodo: ", currentItem);
    };
    const toCompleted = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = e.target;
        console.log("toCompleted: ", currentItem);
    };
    const removeItem = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = e.target;
        console.log("removeItem: ", currentItem);

    };
    const createItem = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem = e.target;
        console.log("createItem: ", currentItem);

    };
    return (
        <div className="container pt-3 pb-5">
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >
                <Row className='gx-5'>
                    <Col className='mb-3 text-center border border-danger rounded' sm={12} md={6}>
                        <h2 className='pb-3'>Todo List <span className='btn btn-success shadow border border-dark' onClick={createItem}>➕</span></h2>
                        <SortableContext id='0' items={todoData.filter((item) => item.completed === 0)}>
                            {
                                todoData.filter((item) => item.completed === 0).map((item) => (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        lBtnHandler={toPending}
                                        rBtnHandler={removeItem}
                                        lBtnTxt='✔'
                                        rBtnTxt='❌'
                                    />
                                ))
                            }
                        </SortableContext>
                    </Col>
                    <Col className='mb-3 text-center border border-warning rounded' sm={12} md={6}>
                        <h2 className='pb-3'>Pending Tasks</h2>
                        <SortableContext id='1' items={todoData.filter((item) => item.completed === 1)}>
                            {
                                todoData.filter((item) => item.completed === 1).map((item) => (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        lBtnHandler={toTodo}
                                        rBtnHandler={toCompleted}
                                        lBtnTxt='↩'
                                        rBtnTxt='✔'
                                    />
                                ))
                            }
                        </SortableContext>
                    </Col>
                </Row>
            </DndContext>
        </div>
    )
}
