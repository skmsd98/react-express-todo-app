import * as React from 'react';
import {
    Box,
    IconButton,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';

import TodosContext from '../../context/TodosContext';
import TodoDetailsModalContext from '../../context/TodoDetailsModalContext';

const tableRowStyles = {
    'td, th': { border: 0 },
    cursor: 'pointer'
};

const tableCellStyles = {
    display: {
        'xs': 'none',
        'md': 'table-cell'
    }
};

export default function TodoItem({ todo, disableModals }) {
    const { deleteTodo, updateTodo } = React.useContext(TodosContext);
    const { handleModalOpen } = React.useContext(TodoDetailsModalContext);

    const handleClickItem = () => {
        !disableModals &&
            handleModalOpen({
                modalType: 'update',
                todoId: todo.id
            });
    }

    const handleClickDelete = () => {
        deleteTodo(todo.id);
    }

    const handleClickCheckbox = () => {
        updateTodo({
            id: todo.id,
            isActive: !todo.isActive
        });
    }

    return (
        <TableRow
            key={todo.id}
            hover={true}
            sx={tableRowStyles}
        >
            <TableCell padding='checkbox'>
                <Checkbox
                    checked={!todo.isActive}
                    onClick={handleClickCheckbox}
                />
            </TableCell>

            <TableCell onClick={handleClickItem} component="th" scope="row">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '10px'
                }}>
                    <Typography
                        variant="h6"
                        sx={{ display: 'inline' }}
                    >{todo.text}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: 'inline' }}
                    >Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </TableCell>

            <TableCell
                onClick={handleClickItem}
                align="right"
                sx={tableCellStyles}
            >
                {todo.priority}
            </TableCell>

            <TableCell
                onClick={handleClickItem}
                align="right"
                sx={tableCellStyles}
            >
                {todo.group}
            </TableCell>

            <TableCell padding='checkbox'>
                <IconButton onClick={handleClickDelete} color='error'>
                    <ClearIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
