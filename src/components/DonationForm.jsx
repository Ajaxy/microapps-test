import React from 'react';
import {map} from 'lodash';

import config from '../config';

export default class DonationForm extends React.Component {
    constructor () {
        super();

        this.state = {
            amount: 50,
            valid: true
        };
    }

    isDisabled () {
        return !this.state.valid || this.props.transactionStatus == 'CHECKOUT';
    }

    validate () {
        const fields = this.refs.form.elements;
        let isValid = true;
        const errors = {};

        if (fields.amount.value > config.MAX_AMOUNT || fields.amount.value < config.MIN_AMOUNT) {
            isValid = false;
            errors.amount = `Amount shouldn't be greater than ${config.MAX_AMOUNT}`;
        }

        this.setState({ errors: errors, valid: isValid });

        return isValid;
    }
    
    handleSubmit (e) {
        e.preventDefault();

        if (this.validate()) {
            this.props.payonCheckout(this.state.amount);
        }

        return false;
    }

    onChangeAmount (e) {
        if (this.validate()) {
            this.setState({ amount: e.target.value });
        }
    }

    render () {
        return (
            <form action="" onSubmit={this.handleSubmit.bind(this)} ref="form">
                <div className="errors">{map(this.state.errors, (err, i) => <div key={i}>{err}</div>)}</div>
                <input type="range"
                       min={config.MIN_AMOUNT}
                       max={config.MAX_AMOUNT}
                       name="amount"
                       onChange={this.onChangeAmount.bind(this)}
                />
                <div><button type="submit" disabled={this.isDisabled()}>
                    Donate {this.state.amount} euro
                </button></div>
            </form>
        );
    }
}