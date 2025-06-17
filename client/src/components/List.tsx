import { useState } from 'react';
import Item from './Item';
import type { User } from '../utils/interfaces';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const dummyData: User[] = [
    {
        id: 1,
        name: 'Jon Smith',
        email: 'test@test.com'
    },
    {
        id: 2,
        name: 'Dave Smith',
        email: 'test1@test.com'
    },
    {
        id: 3,
        name: 'Karen Smith',
        email: 'test2@test.com'
    }
]


export default function List() {
    const [userData, setUserData] = useState<User[]>(dummyData)
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && active.id !== over.id) {
            setUserData(items => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);

            })
        }

    }
    return (
        <div className="container">
            <h2>User List</h2>
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={userData}>

                    {
                        userData.map((item) => (
                            <Item key={item.id} item={item} />
                        ))
                    }
                </SortableContext>
            </DndContext>
        </div>
    )
}
