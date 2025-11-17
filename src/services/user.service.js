import axios from 'axios';
// import { storageService } from './async-storage.service.js';
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'userDB';
// const BASE_URL = 'http://127.0.0.1:3030/api';
const BASE_URL = 'http://localhost:3030/api/user';
const AUTH_URL = 'http://localhost:3030/api/auth';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
   query,
   getById,
   save,
   remove,
   getLoggedinUser,
   login,
   logout,
   signup,
   saveLocalUser,
   getEmptyUser,
};

async function query(filterBy) {
   // return storageService.query(STORAGE_KEY)
   const { data: users } = await axios.get(BASE_URL + '/', { params: { ...filterBy } });
   return await users;
}
async function getById(userId) {
   // return storageService.get(STORAGE_KEY, userId)
   const { data: user } = await axios.get(`${BASE_URL}/${userId}`);
   return user;
}
async function remove(userId) {
   // return storageService.remove(STORAGE_KEY, userId)
   const res = await axios.delete(`${BASE_URL}/${userId}`);
   return res;
}
async function save(user) {
   const method = user._id ? 'put' : 'post';
   const url = BASE_URL + '/' + (user._id || '');

   try {
      const { data: savedUser } = await axios[method](url, user);
      return savedUser;
   } catch (err) {
      console.error('Save error - ', err);
      throw err;
   }
}

async function login(credentials) {
   const { data: user } = await axios.post(AUTH_URL + '/login', credentials);
   if (user) {
      saveLocalUser(user);
   }
   return user;
}

async function logout() {
   await axios.post(AUTH_URL + '/logout');
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

async function signup(credentials) {
   const { data: user } = await axios.post(AUTH_URL + '/signup', credentials);
   return saveLocalUser(user);
}

function saveLocalUser(user) {
   user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin };
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
   return user;
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

function getEmptyUser() {
   return {
      username: '',
      fullname: '',
      password: '',
      imgUrl: '',
   };
}
