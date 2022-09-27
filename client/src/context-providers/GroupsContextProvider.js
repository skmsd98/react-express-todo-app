import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import GroupsContext from '../context/GroupsContext'
import TodosContext from '../context/TodosContext';

import groupsArray from '../data/groups';

export default function GroupsContextProvider({ children }) {
    const { userEmail } = useContext(AuthContext);
    const { todos, setTodos } = useContext(TodosContext);

    const localStorageGroups = localStorage.getItem(`todoAppData:${userEmail}:groups`);
    const myGroups = localStorageGroups ? JSON.parse(localStorageGroups) : groupsArray;

    const [groups, setGroups] = useState(myGroups || []);

    const addGroup = (group) => {
        const groupNameExists = groups.find(({ name }) => name === group.name);
        if (groupNameExists) {
            return alert('Group name already exists')
        }
        setGroups([
            ...groups,
            group
        ]);
    }

    const updateGroup = (group) => {
        const groupNameExists = groups.find(({ name }) => name === group.name);
        if (groupNameExists) {
            return alert('Group name already exists')
        }
        const updatedGroups = groups.map(groupItem => {
            if (groupItem.id === group.id) {
                return {
                    ...groupItem,
                    ...group
                };
            }

            return groupItem;
        })

        const updatedTodos = todos.map(todo => {
            if (todo.groupId === group.id && todo.group !== group.name) {
                return {
                    ...todo,
                    group: group.name
                }
            }

            return todo;
        })

        setGroups(updatedGroups);
        setTodos(updatedTodos);
    }


    const deleteGroup = (groupId) => {
        // Deleting group deletes all todos associated with that group
        const { name: groupName } = groups.find(group => group.id === groupId);
        const updatedGroups = groups.filter(groupItem => groupItem.id !== groupId);
        const updatedTodos = todos.filter(todo => todo.group !== groupName);

        setGroups(updatedGroups);
        setTodos(updatedTodos);
        alert("Todos associated with this group deleted")
    }

    useEffect(() => {
        localStorage.setItem(`todoAppData:${userEmail}:groups`, JSON.stringify(groups));
    }, [groups])

    return (
        <GroupsContext.Provider value={{
            groups,
            addGroup,
            updateGroup,
            deleteGroup
        }}>
            {children}
        </GroupsContext.Provider>
    )
}