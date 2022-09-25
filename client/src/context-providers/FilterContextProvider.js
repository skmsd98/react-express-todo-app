import React, { useContext, useEffect, useState } from 'react'
import FilterContext from '../context/FilterContext'
import GroupsContext from '../context/GroupsContext';
import TodosContext from '../context/TodosContext';

const currentDate = new Date().toISOString().slice(0, 10);

const defaultPriorities = [{
    id: '1',
    value: 'Low',
    checked: true
}, {
    id: '2',
    value: 'Medium',
    checked: true
}, {
    id: '3',
    value: 'High',
    checked: true
}]

export default function FilterContextProvider({ children }) {
    const { groups: contextGroups } = useContext(GroupsContext);
    const { todos, setFilteredTodos } = useContext(TodosContext);

    const defaultGroups = contextGroups.map(group => ({
        ...group,
        checked: true
    }));

    const defaultFilters = {
        "priorities": defaultPriorities,
        "groups": defaultGroups,
        "startDate": currentDate,
        "endDate": currentDate
    };

    const [filters, setFilters] = useState(defaultFilters);


    const filterTodos = ({ priorities, groups, startDate, endDate }) => {
        let selectedPriorities = priorities.map(item => {
            if (item.checked) {
                return item.value;
            }
        });
        let selectedGroups = groups.map(item => {
            if (item.checked) {
                return item.name;
            }
        });

        selectedPriorities = selectedPriorities.filter(item => item);
        selectedGroups = selectedGroups.filter(item => item);

        const filteredTodos = todos.filter(todo => {
            return (
                selectedPriorities.includes(todo.priority) &&
                selectedGroups.includes(todo.group) &&
                new Date(todo.dueDate) >= new Date(startDate) &&
                new Date(todo.dueDate) <= new Date(endDate))
        })

        setFilters({ priorities, groups, startDate, endDate });
        setFilteredTodos(filteredTodos);
    }

    useEffect(() => {
        filterTodos(filters);
    }, [todos])

    return (
        <FilterContext.Provider value={{
            filters,
            filterTodos
        }}>
            {children}
        </FilterContext.Provider>
    )
};