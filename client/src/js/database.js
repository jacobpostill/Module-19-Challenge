import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const database = await initdb('jate', 1);
  const transaction = database.transaction('jate', 'readwrite');
  const jateStoreage = transaction.objectStore('jate');
  await jateStoreage.put({Text: content, id: 1});
  console.log('Data added to Jate')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const database = await initdb('jate', 1);
  const transaction = database.transaction('jate', 'readonly');
  const jateStoreage = transaction.objectStore('jate');
  const final = await jateStoreage.getAll();
  return final.value;
};