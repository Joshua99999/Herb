import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import reducers from './reducers';

const store = configureStore({
    reducer: reducers,
    devTools: true
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

const persister = persistStore(store);

const { dispatch } = store;
axios.interceptors.request.use(function (config) {
    dispatch({ type: 'SHOW_SPINNER' });
    console.log("### axios loading")
    return config;
}, function (error) {
    // alert("error");
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    dispatch({ type: 'HIDE_SPINNER' });
    return response;
}, function (error) {
    return Promise.reject(error);
})


export { store, persister };



