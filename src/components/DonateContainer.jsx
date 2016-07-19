import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../core/actions';
import DonationForm from './DonationForm';
import PayonForm from './PayonForm';
import Thanks from './Thanks';
import Donations from './Donations';

export class Donate extends React.Component {
    render () {
        let mainBlock;

        switch (this.props.transactionStatus) {
            case 'PAYON_FORM':
                mainBlock = <PayonForm {...this.props} />;
                break;
            case 'FINISHED':
                mainBlock = <Thanks {...this.props} />;
                break;
            case 'IDLE':
            case 'CANCELED':
            case 'ERROR':
            default:
                mainBlock = <DonationForm {...this.props} />;
        }

        return (
            <div>
                <h1>Make good things then run</h1>
                {mainBlock}
                <Donations {...this.props} />
            </div>
        );

    }
}

export const DonateContainer = connect((state) => state.toJS(), actions)(Donate);