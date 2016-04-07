import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import Layout from './layout'
import * as Counter from './exampleCounter'
import * as Grid from './widgetGrid'
import 'semantic-ui/dist/semantic.css';
import 'semantic-ui/dist/semantic.js';
import createLogger from 'redux-logger';

let reducer = Redux.combineReducers({
	counter: Counter.reducer,
	widgetGrid: Grid.reducer
});

const logger = createLogger();
let store = Redux.createStore(reducer, Redux.applyMiddleware(logger));

console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		<Layout/>
	</Provider>,
	document.getElementById('app'));