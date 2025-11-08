import axios from 'axios';
// import { storageService } from './async-storage.service.js';
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'bugDB';
// const BASE_URL = 'http://127.0.0.1:3030/api';
const BASE_URL = 'http://localhost:3030/api/bug';

export const bugService = {
   query,
   getById,
   save,
   remove,
};

async function query(filterBy) {
   // return storageService.query(STORAGE_KEY)
   const { data: bugs } = await axios.get(BASE_URL + '/', { params: filterBy });
   return await bugs;
}
async function getById(bugId) {
   // return storageService.get(STORAGE_KEY, bugId)
   const { data: bug } = await axios.get(`${BASE_URL}/${bugId}`);
   return bug;
}
async function remove(bugId) {
   // return storageService.remove(STORAGE_KEY, bugId)
   const res = await axios.delete(`${BASE_URL}/${bugId}`);
   return res;
}
async function save(bug) {
   const method = bug._id ? 'put' : 'post';
   const url = BASE_URL + '/' + (bug._id || '');

   try {
      const { data: savedBug } = await axios[method](url, bug);
      return savedBug;
   } catch (err) {
      console.error('Save error - ', err);
      throw err;
   }
}
