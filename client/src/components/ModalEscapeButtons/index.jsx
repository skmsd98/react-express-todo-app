import { Box, Button } from '@mui/material';

export default function ModalEscapeButtons({ modalType, handleModalCloseBaseModal, handleModalDoneBaseModal }) {
    return (
        <Box sx={{
            display: 'block',
            marginLeft: 'auto !important',
            marginTop: '30px'
        }}>
            <Button
                onClick={handleModalCloseBaseModal}
                sx={{ mr: 2 }}
                variant="contained"
                color="error"
            >
                Cancel
            </Button>

            <Button
                onClick={handleModalDoneBaseModal}
                variant="contained"
            >
                {modalType === 'add' ? 'Add' : 'Update'}
            </Button>
        </Box>
    );
}
