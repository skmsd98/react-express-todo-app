import {
    useContext,
    useEffect,
    useState
} from 'react';
import TodosContext from '../context/TodosContext';
import AuthContext from '../context/AuthContext';
import todosArray from '../data/todos';

function TodoContextProvider({ children }) {
    const { userEmail } = useContext(AuthContext);

    const localStorageTodos = localStorage.getItem(`todoAppData:${userEmail}:todos`);
    const myTodos = localStorageTodos ? JSON.parse(localStorageTodos) : todosArray;

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
        localStorage.setItem(`todoAppData:${userEmail}:todos`, JSON.stringify(todos));
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