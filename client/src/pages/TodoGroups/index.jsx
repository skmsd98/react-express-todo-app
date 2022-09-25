import { useContext, useState } from 'react';
import { Button } from '@mui/material';

import GroupList from '../../components/GroupList';
import GroupDetails from '../../components/GroupDetails';
import GroupsContext from '../../context/GroupsContext';
import GroupDetailsModalContext from '../../context/GroupDetailsModalContext';

function TodoGroups() {
    const { groups } = useContext(GroupsContext);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleModalOpen = ({ modalType, groupId = null }) => {
        setModalType(modalType);
        modalType !== 'add' && setSelectedGroupId(groupId);
        setShowModal(true);
    }

    return (
        <>
            <GroupDetailsModalContext.Provider
                value={{
                    showModal,
                    modalType,
                    selectedGroupId,
                    handleModalClose,
                    handleModalOpen,
                    setSelectedGroupId
                }}>

                <Button
                    variant="contained"
                    onClick={() => handleModalOpen({ modalType: 'add' })}>
                    Add Group
                </Button>

                <GroupList groups={groups} />

                <GroupDetails />

            </GroupDetailsModalContext.Provider>

        </>
    );
}

export default TodoGroups;