import { useContext } from 'react';
import TodoList from '../../components/TodoList/index';
import TodoDetailsModalContext from '../../context/TodoDetailsModalContext';
import TodosContext from '../../context/TodosContext';

const todoListHeight = {
    'xs': 'calc(100vh - 205px)',
    'sm': 'calc(100vh - 215px)',
    'lg': 'calc(100vh - 235px)'
};

function CompletedTodos() {
    const { todos } = useContext(TodosContext);

    const completedTodos = todos.filter(todo => !todo.isActive);

    return (
        <>
            <TodoDetailsModalContext.Provider value={{}}>
                <TodoList
                    todos={completedTodos}
                    disableModals={true}
                    height={todoListHeight}
                />
            </TodoDetailsModalContext.Provider>
        </>
    );
}

export default CompletedTodos;