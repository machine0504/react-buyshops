import addReducer from'./addReducers';
import cartReducer from './cartReducers';
import userReducer from './userReducers';
import { combineReducers } from 'redux';
let reducers = combineReducers({
    add: addReducer,
    cart:cartReducer,
    user:userReducer
})
export default reducers;