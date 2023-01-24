import { createStore, combineReducers } from 'redux';

import PelangganReducer from './reducers/pelanggan_reducer';

import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
const RootReducer = combineReducers(
    {model: PelangganReducer,
    modelPelanggan: PelangganReducer,
    modelPenjualan: PelangganReducer
    }
)
const configureStore = () => {
    return createStore(RootReducer, applyMiddleware(thunk));
}
export default configureStore;