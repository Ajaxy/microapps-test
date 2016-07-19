import 'whatwg-fetch';
import querystring from 'querystring';
import {Map} from 'immutable';

const credentials = Map({
    'authentication.userId': '8a8294174b7ecb28014b9699220015cc',
    'authentication.password': 'sy6KJsT8',
    'authentication.entityId': '8a8294174b7ecb28014b9699220015ca'
});

export function parseResultQuery (state) {
    return new Promise(function (resolve, reject) {
        const params = querystring.parse(location.search.substr(1));
        const checkout = state.get('checkout');
        const id = checkout ? checkout.get('id') : null;

        if (params.resourcePath && params.id === id) {
            resolve(params);
        } else {
            reject();
        }
    });
}

export function checkout (amount) {
    const data = querystring.stringify(Map({
        'amount': amount,
        'currency': 'EUR',
        'paymentType': 'DB'
    }).merge(credentials).toJS());

    return fetch('https://test.oppwa.com/v1/checkouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        },
        body: data
    }).then((res) => res.json());
}

export function check (checkoutId) {
    const query = querystring.stringify(credentials.toJS());

    return fetch(`https://test.oppwa.com/v1/checkouts/${checkoutId}/payment?` + query)
        .then((res) => res.json());
}