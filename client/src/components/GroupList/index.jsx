import * as React from 'react';
import { List } from '@mui/material';

import GroupItem from '../GroupItem';

export default function GroupList({ groups }) {
    return (
        <div>
            <List sx={{
                overflowY: 'scroll',
                height: {
                    'xs': 'calc(100vh - 320px)',
                    'sm': 'calc(100vh - 330px)',
                    'lg': 'calc(100vh - 350px)'
                }
            }}>
                {groups.map((group) => (
                    <GroupItem
                        key={group.id}
                        group={group}
                    />
                ))}
            </List>
        </div>
    );
}
