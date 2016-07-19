import React from 'react';

export default class Donations extends React.Component {
    render () {
        return this.props.donations.length ? (
            <div>
                <h4>Your donations:</h4>
                {this.props.donations.map((donation, i) =>
                    <div key={i} className="donation">{donation.amount} euro ({donation.checkout.id})</div>
                )}
            </div>
        ) : <div />;
    }
}