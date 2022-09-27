import groups from './groups';

export default [
    {
        id: '1',
        text: 'Buy come groceries',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'Low',
        groupId: groups[0].id,
        group: groups[0]['name'],
        isActive: true
    },
    {
        id: '2',
        text: 'read a book',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'Medium',
        groupId: groups[1].id,
        group: groups[1]['name'],
        isActive: false
    },
    {
        id: '3',
        text: 'go to shopping mall',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'High',
        groupId: groups[2].id,
        group: groups[2]['name'],
        isActive: true
    }
]