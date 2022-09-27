import { useContext, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import BaseModal from '../BaseModal';
import SelectMenu from '../SelectMenu';
import GroupsContext from '../../context/GroupsContext';
import TodoDetailsModalContext from '../../context/TodoDetailsModalContext';
import TodosContext from '../../context/TodosContext';


export default function TodoDetails() {

    // FORM HANDLING
    const currentDate = new Date().toISOString().slice(0, 10);

    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState(currentDate);
    const [priority, setPriority] = useState('Medium');
    const [group, setGroup] = useState('');

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const handleChangeDueDate = (e) => {
        setDueDate(e.target.value);
    }
    /////////////////


    // MODALS HANDLING
    const { groups } = useContext(GroupsContext);
    const { showModal, modalType, selectedTodoId, handleModalClose } = useContext(TodoDetailsModalContext);
    const { todos, addTodo, updateTodo } = useContext(TodosContext);


    const handleModalCloseBaseModal = () => {
        handleModalClose();
        resetFormData();
    }

    const handleModalDoneBaseModal = () => {
        if (isFormValid()) {
            const groupId = groups.find(group.name === group).id;

            const newTodo = {
                id: uuidv4(),
                text,
                dueDate,
                priority,
                group,
                groupId,
                isActive: true
            };

            modalType === 'add' ?
                addTodo(newTodo) :
                updateTodo({
                    id: selectedTodoId,
                    text,
                    dueDate,
                    priority,
                    group,
                    groupId
                });

            handleModalClose();
            resetFormData();
        } else
            alert("Please fill the details properly")
    }

    const resetFormData = () => {
        setText('');
        setDueDate(currentDate);
        setPriority('Medium');
        setGroup('');
    }

    const isFormValid = () => {
        return text && dueDate && priority && group;
    }
    /////////////////

    const groupNames = groups.map(group => group.name);


    useEffect(() => {
        if (showModal && modalType !== 'add' && selectedTodoId) {
            const { text, dueDate, priority, group } = todos.find(todo => todo.id === selectedTodoId);

            setText(text);
            setDueDate(dueDate);
            setPriority(priority);
            setGroup(group);
        }
    }, [showModal])

    return (
        <div>
            <BaseModal
                showModal={showModal}
                modalType={modalType}
                handleModalCloseBaseModal={handleModalCloseBaseModal}
                handleModalDoneBaseModal={handleModalDoneBaseModal}
            >
                <form>
                    <Stack spacing={3}>
                        <TextField
                            label="Todo Text"
                            placeholder="Todo Text"
                            multiline
                            fullWidth
                            required
                            value={text}
                            onChange={handleChangeText}
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={handleChangeDueDate}
                        />
                        <SelectMenu
                            label="Priority"
                            values={['High', 'Medium', 'Low']}
                            currentValue={priority}
                            handleValueChange={setPriority}
                        />
                        <SelectMenu
                            label="Group"
                            values={groupNames}
                            currentValue={group}
                            handleValueChange={setGroup}
                        />
                    </Stack>
                </form>
            </BaseModal>
        </div>
    );
}