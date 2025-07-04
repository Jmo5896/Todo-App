import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useQuery, useMutation } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';

import Item from './Item';
import type { Todo } from '../utils/interfaces';
import { QUERY_ME } from '../utils/queries';
import { CREATE_TODO, UPDATE_TODO_ORDER, TO_PENDING, UNDO_PENDING, COMPLETE_TASK } from '../utils/mutations';
import CreateTodoModal from './CreateTodoModal';
import auth from '../utils/auth';

export default function List() {
    const [todoData, setTodoData] = useState<Todo[]>([])
    const [show, setShow] = useState(false);

    const { error: meError, data: meData } = useQuery(QUERY_ME)
    const [createTodo, { error: createTodoError }] = useMutation(CREATE_TODO);
    const [changeTodoOrder, { error: changeTodoOrderError }] = useMutation(UPDATE_TODO_ORDER);
    const [toPendingMutation, { error: toPendingError }] = useMutation(TO_PENDING);
    const [undoPendingMutation, { error: undoPendingError }] = useMutation(UNDO_PENDING);
    const [completeTaskMutation, { error: completeTaskError }] = useMutation(COMPLETE_TASK);

    if (meError) {
        console.log(JSON.stringify(meError));
    }
    if (createTodoError) {
        console.log(JSON.stringify(createTodoError));
    }
    if (changeTodoOrderError) {
        console.log(JSON.stringify(changeTodoOrderError));
    }
    if (toPendingError) {
        console.log(JSON.stringify(toPendingError));
    }
    if (undoPendingError) {
        console.log(JSON.stringify(undoPendingError));
    }
    if (completeTaskError) {
        console.log(JSON.stringify(completeTaskError));
    }

    const freshTodos = meData?.me.todos || [];

    useEffect(() => {
        setTodoData(freshTodos)
        !auth.loggedIn() && window.location.assign('/login')
    }, [freshTodos])

    const handleDragEnd = async (e: DragEndEvent) => {
        e.activatorEvent.stopPropagation();
        const { active, over } = e;

        if (over && active.id !== over.id) {
            let items = [...todoData];

            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            items = arrayMove(items, oldIndex, newIndex);
            setTodoData(items)
            try {
                await changeTodoOrder({
                    variables: {
                        todos: items.map(obj => obj._id)
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toPending = async (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem: any = e.target;
        try {
            const updatedTodos = await toPendingMutation({
                variables: {
                    todoId: currentItem.dataset.id
                }
            })
            setTodoData(updatedTodos.data.toPending.todos)

        } catch (err) {
            console.error(err);
        }
    };
    const toTodo = async (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem: any = e.target;
        try {
            const updatedTodos = await undoPendingMutation({
                variables: {
                    todoId: currentItem.dataset.id
                }
            })
            setTodoData(updatedTodos.data.undoPending.todos)

        } catch (err) {
            console.error(err);
        }
    };
    const toCompleted = async (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const currentItem: any = e.target;
        try {
            const updatedTodos = await completeTaskMutation({
                variables: {
                    todoId: currentItem.dataset.id
                }
            })
            setTodoData(updatedTodos.data.completeTask.todos)

        } catch (err) {
            console.error(err);
        }
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
