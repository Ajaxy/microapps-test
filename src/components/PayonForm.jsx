import React from 'react';
import config from '../config';

import styles from './PayonForm.less'

export default class PayonForm extends React.Component {
    componentWillMount () {
        const script = document.createElement("script");
        script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${this.props.checkout.id}`;
        script.async = true;
        document.body.appendChild(script);
    }

    render () {
        return (
            <div>
                <h2>Donating {this.props.checkout.amount} euro</h2>
                <button onClick={this.props.payonCancel}>Cancel</button>
                <div className={styles.breaker}></div>
                <form action={config.PAYON_RESULT_URL} className="paymentWidgets">VISA MASTER AMEX</form>
            </div>
        );
    }
}