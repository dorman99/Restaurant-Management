import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import signupReducer from './Reducers/signupReducer'
import loginReducer from './Reducers/loginReducer'
import foodReducer from './Reducers/foodReducer'
import myorderReducer from './Reducers/myorderReducer'
import adminReducer from './Reducers/adminReducer'
import chefReducer from './Reducers/chefReducer'
import editReducer from './Reducers/editReducer'

const appStore = combineReducers({
	signupReducer,
	loginReducer,
	foodReducer,
	myorderReducer,
	chefReducer,
	adminReducer,
	editReducer
})

const store = createStore(
	appStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)

export default store