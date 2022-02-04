import { createSlice, combineReducers } from '@reduxjs/toolkit'

const itemsSlice = createSlice({
    name: 'items',
    initialState: [
        { id: 'id-1', name: 'Rosie Simpson', number: '+38 (099) 459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '+38 098 443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '+38 (098) 645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '+38 098 227-91-26' },
    ],
    reducers: {
        addContact: (state, { payload }) => {
            return [...state, payload];
        },
        deleteContact: (state, { payload }) => state.filter(contact => contact.id !== payload)

    },
})
const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        changeFilter: (_, { payload }) => payload,
    },
})
export const { addContact, deleteContact } = itemsSlice.actions;

export const { changeFilter } = filterSlice.actions;

// console.log(itemsSlice);
// console.log(itemsSlice.actions);

const contactsReducer = combineReducers({
    [itemsSlice.name]: itemsSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
});

export default contactsReducer;



