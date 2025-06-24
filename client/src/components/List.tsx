import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useQuery, useMutation } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';

import Item from './Item';
import type { Todo } from '../utils/interfaces';
import { QUERY_ME } from '../utils/queries';
import { CREATE_TODO } from '../utils/mutations';
import CreateTodoModal from './CreateTodoModal';

export default function List() {
    const [todoData, setTodoData] = useState<Todo[]>([])
    const [show, setShow] = useState(false);

    const { error: meError, data: meData } = useQuery(QUERY_ME)
    const [createTodo, { error: createTodoError }] = useMutation(CREATE_TODO);

    if (meError) {
        console.log(JSON.stringify(meError));
    }
    if (createTodoError) {
        console.log(JSON.stringify(createTodoError));
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    const createItem = async (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        // console.log(formData.get("task"));

        try {
            await createTodo({
                variables: {
                    task: formData.get("task")
                }
            });

        } catch (err) {
            console.error(err);
        }
        handleClose()
    };

    return (
        <div className="container pt-3 pb-5">
            <CreateTodoModal
                show={show}
                handleClose={handleClose}
                createItem={createItem}
            />
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >
                <Row className='gx-5'>
                    <Col className='mb-3 text-center border border-danger rounded' sm={12} md={6}>
                        <h2 className='pb-3'>Todo List <span className='btn btn-success shadow border border-dark' onClick={handleShow}>➕</span></h2>
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
