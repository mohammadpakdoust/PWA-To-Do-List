import Dexie from 'dexie';

export const db = new Dexie('TaskDB');

db.version(1).stores({
    tasks: '++id, description, deadline'
});

db.version(2).stores({
    tasks: '++id, description, deadline, completed'
});

db.version(3).stores({
    tasks: '++id, description, deadline, completed, notes'
});
