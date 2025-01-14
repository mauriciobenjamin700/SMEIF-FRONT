import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage por padrão
import { combineReducers } from 'redux';

import userReducer from '../redux/reduxers/userSlice.js';
import headerReducer from '../redux/reduxers/headerSlice.js';
import eventsReducer from '../redux/reduxers/eventsSlice.js'

// Configuração do redux-persist
const persistConfig = {
  key: 'root', // Chave para armazenar os dados
  storage, // Usa o localStorage para persistência
};

// Combinando os reducers
const rootReducer = combineReducers({
  user: userReducer,
  header: headerReducer,
  events: eventsReducer,
});

// Aplicando persistência ao rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurando o store
const store = configureStore({
  reducer: persistedReducer, // Usando o reducer persistido
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignorar ações do redux-persist
      },
    }),
});

export const persistor = persistStore(store);

export default store;
