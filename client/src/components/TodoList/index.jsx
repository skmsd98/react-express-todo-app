import * as React from 'react';
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table
} from '@mui/material';

import TodoItem from '../TodoItem';

const tableContainerStyles = (height) => ({
    overflowY: 'scroll',
    height
});

const tableHeadStyles = {
    display: {
        'xs': 'none',
        'md': 'table-header-group'
    }
};


const tableHeadRow = () => {
    const tableCellStyles = {
        display: {
            'xs': 'none',
            'md': 'table-cell'
        }
    };

    return (
        <TableRow>
            <TableCell></TableCell>
            <TableCell>Task</TableCell>
            <TableCell align="right" sx={tableCellStyles}>Prioity</TableCell>
            <TableCell align="right" sx={tableCellStyles}>Group</TableCell>
            <TableCell></TableCell>
        </TableRow >
    )
};

export default function TodoList({ todos, height, disableModals = false }) {
    return (
        <TableContainer component={Paper} sx={() => tableContainerStyles(height)}>
            <Table aria-label="simple table">
                <TableHead sx={tableHeadStyles}>
                    {tableHeadRow()}
                </TableHead>

                <TableBody>
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            disableModals={disableModals}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}