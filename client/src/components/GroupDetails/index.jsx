import { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import BaseModal from '../BaseModal';
import GroupsContext from '../../context/GroupsContext';
import GroupDetailsModalContext from '../../context/GroupDetailsModalContext';

export default function GroupDetails() {
    // FORM HANDLING
    const [name, setName] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    /////////////////


    // MODALS HANDLING
    const { groups, addGroup, updateGroup } = useContext(GroupsContext);
    const { showModal, modalType, selectedGroupId, handleModalClose } = useContext(GroupDetailsModalContext);

    const handleModalCloseBaseModal = () => {
        handleModalClose();
        setName('');
    }

    const handleModalDoneBaseModal = () => {
        if (name) {
            const newGroup = {
                id: uuidv4(),
                name
            };

            modalType === 'add' ?
                addGroup(newGroup) :
                updateGroup({
                    id: selectedGroupId,
                    name
                });

            handleModalClose();
            setName('');
        } else
            alert("Please fill the details properly")
    }

    /////////////////

    useEffect(() => {
        if (showModal && modalType !== 'add' && selectedGroupId) {
            const { name } = groups.find(group => group.id === selectedGroupId);

            setName(name);
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
                <TextField
                    id="outlined-textarea"
                    label="Group Name"
                    placeholder="Group Name"
                    multiline
                    sx={{ width: '100%' }}
                    value={name}
                    onChange={handleChangeName}
                />
            </BaseModal>
        </div>
    );
}
