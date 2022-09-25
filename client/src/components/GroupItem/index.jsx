import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    IconButton,
    ListItemText,
    ListItem
} from '@mui/material';
import GroupsContext from '../../context/GroupsContext';
import GroupDetailsModalContext from '../../context/GroupDetailsModalContext';

export default function GroupItem({ group }) {
    const { deleteGroup } = React.useContext(GroupsContext);
    const { handleModalOpen } = React.useContext(GroupDetailsModalContext);

    const handleClickEdit = () => {
        handleModalOpen({
            modalType: 'update',
            groupId: group.id
        });
    }

    const handleClickDelete = () => {
        deleteGroup(group.id);
    }

    return (
        <ListItem
            sx={{
                backgroundColor: "white",
                marginY: 1,
                p: 2,
                borderRadius: 2
            }}
            secondaryAction={
                <IconButton onClick={handleClickDelete} color='error'>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={group.name}
            />
            <IconButton onClick={handleClickEdit} sx={{ marginRight: 6 }}>
                <EditIcon />
            </IconButton>
        </ListItem>
    );
}