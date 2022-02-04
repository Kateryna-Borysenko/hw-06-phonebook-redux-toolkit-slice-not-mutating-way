import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contactsSlice';
// console.log(contactsReducer);


const persistContactsConfig = {
    key: 'filter',
    storage,
    whitelist: ['filter']
};

const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    timestamp: false,
});

const store = configureStore({
    reducer: {
        contacts: persistReducer(persistContactsConfig, contactsReducer),
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
    devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };