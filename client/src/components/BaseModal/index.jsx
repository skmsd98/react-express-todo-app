import * as React from 'react';
import {
    Fade,
    Modal,
    Box,
    Backdrop
} from '@mui/material';

import ModalEscapeButtons from '../ModalEscapeButtons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    boxSizing: 'border-box'
};

export default function BaseModal({ showModal, modalType, handleModalCloseBaseModal, handleModalDoneBaseModal, children }) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showModal}
                onClose={handleModalCloseBaseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModal}>
                    <Box sx={style}>
                        {children}
                        <ModalEscapeButtons
                            modalType={modalType}
                            handleModalCloseBaseModal={handleModalCloseBaseModal}
                            handleModalDoneBaseModal={handleModalDoneBaseModal}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
