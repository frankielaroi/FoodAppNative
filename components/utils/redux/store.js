import { configureStore } from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['user']
}
const rootReducer = combineReducers({
    
})
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persist0r = persistStore(store) 