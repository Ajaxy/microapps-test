import {checkout} from '../payon/payon'

export function donate (transaction) {
    return {
        type: 'DONATE',
        transaction
    };
}

export function freeze () {
    return {
        type: 'FREEZE'
    };
}

export function unfreeze () {
    return {
        type: 'UNFREEZE'
    };
}

export function updateDelay (delay) {
    return {
        type: 'UPDATE_DELAY',
        delay
    };
}

export function transactionState (status, checkout) {
    return {
        type: 'TRANSACTION_STATE',
        status,
        checkout
    };
}

export function payonCheckout (amount) {
    return (dispatch) => {
        dispatch(transactionState('CHECKOUT'));

        checkout(amount).then(function (result) {
            result.amount = amount;
            dispatch(transactionState('PAYON_FORM', result));
        }, function () {
            dispatch(transactionState('ERROR'))
        });
    }
}

export function payonCancel () {
    return transactionState('CANCELED');
}

export function payonFinished () {
    return transactionState('FINISHED');
}