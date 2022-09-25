import ActiveTodos from '../ActiveTodos';
import CompletedTodos from '../CompletedTodos';
import TodoGroups from '../TodoGroups';
import TabPanel from './TabPanel';

function TabPanels({ currentTab }) {
    return (
        <>
            <TabPanel value={currentTab} index={0}>
                <ActiveTodos />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <CompletedTodos />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                <TodoGroups />
            </TabPanel>
        </>
    );
}

export default TabPanels;