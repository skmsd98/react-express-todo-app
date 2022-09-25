import { useContext, useState } from 'react';
import { Button, Box } from '@mui/material';

import TodoList from '../../components/TodoList/index';
import TodoDetails from '../../components/TodoDetails';
import TodosContext from '../../context/TodosContext';
import TodoDetailsModalContext from '../../context/TodoDetailsModalContext';
import FilterButton from '../../components/FilterButton';

const filterButtonStyles = {
    marginTop: '20px',
    marginLeft: 'calc(100% - 118px)'
};

const todoListHeight = {
    'xs': 'calc(100vh - 260px)',
    'sm': 'calc(100vh - 270px)',
    'lg': 'calc(100vh - 290px)'
};

function ActiveTodos() {
    const { filteredTodos } = useContext(TodosContext);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleModalOpen = ({ modalType, todoId = null }) => {
        setModalType(modalType);
        modalType !== 'add' && setSelectedTodoId(todoId);
        setShowModal(true);
    }

    const activeTodos = filteredTodos.filter(todo => todo.isActive);

    return (
        <>
            <TodoDetailsModalContext.Provider
                value={{
                    showModal,
                    modalType,
                    selectedTodoId,
                    handleModalClose,
                    handleModalOpen,
                    setSelectedTodoId
                }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        sx={{ marginBottom: '20px' }}
                        onClick={() => handleModalOpen({ modalType: 'add' })}>
                        Add Todo
                    </Button>
                    <FilterButton sx={filterButtonStyles} />
                </Box>

                <TodoList
                    todos={activeTodos}
                    height={todoListHeight}
                />

                <TodoDetails />

            </TodoDetailsModalContext.Provider>
        </>
    );
}

export default ActiveTodos;