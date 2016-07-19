import React from 'react';

import config from '../config';
import Donations from './Donations';

export default class extends React.Component {
    getDelayString () {
        const delay = Math.round((config.DONATION_DELAY - (Date.now() - this.props.lastDonationAt)) / 1000);
        const secs = (delay % 60).toString();
        const mins = Math.ceil((delay - secs) / 60).toString();

        return `${mins}:${secs.length < 2 ? '0' : ''}${secs} min`
    }

    render () {
        return (
            <div>
                <h2>Thank you!</h2>
                <div>
                    You can donate again in {this.getDelayString()}.
                </div>
            </div>
        );
    }
}