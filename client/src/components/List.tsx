import { useState } from 'react';
import Item from './Item';
import type { Todo } from '../utils/interfaces';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Row, Col } from 'react-bootstrap';

const dummyData: Todo[] = [
    {
        id: "1",
        task: 'test task 1',
        completed: 1
    },
    {
        id: "2",
        task: 'test task 2',
        completed: 0
    },
    {
        id: "3",
        task: 'test task 3',
        completed: 1
    },
    {
        id: "4",
        task: 'test task 4',
        completed: 2
    },
    {
        id: "5",
        task: 'test task 5',
        completed: 0
    },
    {
        id: "6",
        task: 'test task 6',
        completed: 0
    },
]


export default function List() {
    const [todoData, setTodoData] = useState<Todo[]>(dummyData)
    const handleDragEnd = (e: DragEndEvent) => {
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

    const toPending = (e: MouseEvent) => {
        e.preventDefault();
        const currentItem = e.target;
        console.log(currentItem);

    };
    // const toTodo= (e: MouseEvent) => {};
    // const toCompleted= (e: MouseEvent) => {};
    const removeItem = (e: MouseEvent) => {
        e.preventDefault();
        const currentItem = e.target;
        console.log(currentItem);

    };
    return (
        <div className="container pt-3 pb-5">
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >

                <Row>
                    <Col className='mb-3' sm={12} md={6}>
                        <h2 className='pb-3'>Todo List</h2>

                        <SortableContext id='0' items={todoData.filter((item) => item.completed === 0)}>

                            {
                                todoData.filter((item) => item.completed === 0).map((item) => (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        toPending={toPending}
                                        removeItem={removeItem}
                                    />
                                ))
                            }
                        </SortableContext>
                        {/* </DndContext> */}
                    </Col>
                    <Col sm={12} md={6}>
                        <h2 className='pb-3'>Pending Tasks</h2>
                        {/* <DndContext
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                    > */}
                        <SortableContext id='1' items={todoData.filter((item) => item.completed === 1)}>

                            {
                                todoData.filter((item) => item.completed === 1).map((item) => (
                                    <Item key={item.id} item={item} />
                                ))
                            }
                        </SortableContext>
                    </Col>
                </Row>
            </DndContext>
        </div>
    )
}
