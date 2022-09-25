import {
    useContext,
    useEffect,
    useState
} from 'react';
import TodosContext from '../context/TodosContext';
import AuthContext from '../context/AuthContext';
import todosArray from '../data/todos';
import groupsArray from '../data/groups';

function TodoContextProvider({ children }) {
    const { userEmail } = useContext(AuthContext);

    const todoAppData = localStorage.getItem(`todoAppData:${userEmail}`);
    const myTodos = todoAppData ? JSON.parse(todoAppData).todos : todosArray;
    const myGroups = todoAppData ? JSON.parse(todoAppData).todos : groupsArray;

    const [todos, setTodos] = useState(myTodos || []);
    const [filteredTodos, setFilteredTodos] = useState(todos);

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            todo
        ]);
    }

    const updateTodo = (todo) => {
        const updatedTodos = todos.map(todoItem => {
            if (todoItem.id === todo.id) {
                return { ...todoItem, ...todo };
            }

            return todoItem;
        })

        setTodos(updatedTodos);
    }

    const deleteTodo = (todoId) => {
        const updatedTodos = todos.filter(todoItem => todoItem.id !== todoId);
        setTodos(updatedTodos);
    }

    useEffect(() => {
        localStorage.setItem(`todoAppData:${userEmail}`, JSON.stringify({ todos, myGroups }));
    }, [todos])

    return (
        <TodosContext.Provider value={{
            todos,
            filteredTodos,
            addTodo,
            updateTodo,
            deleteTodo,
            setFilteredTodos,
            setTodos
        }}>
            {children}
        </TodosContext.Provider>
    );
}

export default TodoContextProvider;