import config from '../config';
import * as actions from './actions';

const INTERVAL = config.DONATION_DELAY_INTERVAL;

export default (store) => {
    let isFrozen = false;
    let intervalId = null;

    function testForDelay () {
        const state = store.getState();
        const lastDonationAt = state.get('lastDonationAt');

        if (!lastDonationAt) {
            return;
        }

        const delay = config.DONATION_DELAY - (Date.now() - lastDonationAt);

        if (delay <= 0 && state.get('transactionStatus') == 'FINISHED') {
            unfreeze();
        } else if (delay > 0 && !isFrozen) {
            freeze(delay);
        }
    }

    function unfreeze () {
        isFrozen = false;
        clearDelay();
        store.dispatch(actions.transactionState('IDLE'));
    }

    function freeze (delay) {
        isFrozen = true;
        store.dispatch(actions.transactionState('FINISHED'));
        setupDelay(delay);
    }

    function setupDelay (delay) {
        updateDelay(delay);

        intervalId = setInterval(() => {
            if (delay > 0) {
                updateDelay(delay -= INTERVAL);
            } else {
                clearDelay();
            }
        }, INTERVAL);
    }

    function updateDelay (delay) {
        store.dispatch(actions.updateDelay(delay));
    }

    function clearDelay () {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    store.subscribe(testForDelay);
    testForDelay();
};