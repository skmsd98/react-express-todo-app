import groups from './groups';

export default [
    {
        id: '2',
        text: 'Buy come groceries',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'Low',
        group: groups[0]['name'],
        isActive: true
    },
    {
        id: '3',
        text: 'read a book',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'Medium',
        group: groups[1]['name'],
        isActive: false
    },
    {
        id: '4',
        text: 'go to shopping mall',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'High',
        group: groups[2]['name'],
        isActive: true
    }
]