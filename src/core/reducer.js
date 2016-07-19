import {List, Map, fromJS} from 'immutable';

function donate (state, result) {
    if (state.get('transactionStatus') != 'PAYON_FORM') {
        return state;
    }

    const checkout = state.get('checkout').toJS();

    return state
        .set('checkout', null)
        .set('lastDonationAt', Date.now())
        .updateIn(['donations'], List(), (donations) => donations.push(fromJS({
            amount: checkout.amount,
            checkout,
            result
        })))
        .set('transactionStatus', 'FINISHED');
}

function updateDelay (state, delay) {
    return state.set('donationDelay', delay);
}

function setTransactionState (state, status, checkout) {
    if (checkout) {
        state = state.set('checkout', checkout);
    }

    return state
        .set('transactionStatus', status);
}

export default (state = Map(), action) => {
    switch (action.type) {
        case 'DONATE': return donate(state, action.transaction);
        case 'FREEZE': return freeze(state);
        case 'UNFREEZE': return unfreeze(state);
        case 'UPDATE_DELAY': return updateDelay(state, action.delay);
        case 'TRANSACTION_STATE': return setTransactionState(state, action.status, action.checkout);
    }

    return state;
}
