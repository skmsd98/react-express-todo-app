import { useState } from 'react';
import {
    Box,
    Divider,
    Tab,
    Tabs
} from '@mui/material';

import { a11yProps } from './TabPanel';
import TabPanels from './TabPanels';

import FilterContextProvider from '../../context-providers/FilterContextProvider';
import TodoContextProvider from '../../context-providers/TodoContextProvider';
import GroupsContextProvider from '../../context-providers/GroupsContextProvider';

const mainWrapperStyles = {
    width: '100%',
    maxWidth: '1400px',
    height: {
        'xs': 'calc(100vh - 80px)',
        'sm': 'calc(100vh - 90px)',
        'lg': 'calc(100vh - 110px)'
    },
    margin: 'auto',
    bgcolor: '#efefef',
    marginTop: {
        'xs': '70px',
        'sm': '80px',
        'lg': '100px'
    },
    padding: '20px',
    boxSizing: 'border-box'
};

const tabsWrapperStyles = {
    display: 'flex',
    justifyContent: {
        'xs': 'center',
        'md': 'left'
    }
};

function Main() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    return (
        <Box sx={mainWrapperStyles}>
            <Box sx={tabsWrapperStyles}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Active" {...a11yProps(0)} />
                    <Tab label="Completed" {...a11yProps(1)} />
                    <Tab label="Groups" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <Divider sx={{ marginY: '20px' }}></Divider>

            <TodoContextProvider>
                <GroupsContextProvider>
                    <FilterContextProvider>
                        <TabPanels currentTab={currentTab} />
                    </FilterContextProvider>
                </GroupsContextProvider>
            </TodoContextProvider>
        </Box>
    );
}

export default Main;