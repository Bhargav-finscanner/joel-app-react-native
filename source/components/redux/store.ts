import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { ActionsTypeForAuthReducer, authReducer } from './authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const combineReducer = combineReducers({
  auth: authReducer,
});

const persistReducers = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);

export type ActionType = ActionsTypeForAuthReducer


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

