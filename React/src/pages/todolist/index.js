import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

const TodoList = () => (<Provider store={store}><App /></Provider>)

export default TodoList;

