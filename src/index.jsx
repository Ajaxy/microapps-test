import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';

import * as actions from './core/actions';
import reducer from './core/reducer';
import donationFreezer from './core/donationFreezer';
import {parseResultQuery} from './payon/payon';
import {DonateContainer} from './components/DonateContainer';

import styles from '../styles/main.less';

const INITIAL_STATE = fromJS({
    transactionStatus: 'IDLE',
    donations: []
});

const store = createStore(
    compose(
        mergePersistedState((initial, persisted) => initial.merge(persisted))
    )(reducer),
    INITIAL_STATE,
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
        persistState()
    )
);

donationFreezer(store);

parseResultQuery(store.getState())
    .then(function (params) {
        store.dispatch(actions.donate(params));
    }).catch();

ReactDOM.render(
    <Provider store={store}>
        <DonateContainer />
    </Provider>,
    document.getElementById('app')
);
