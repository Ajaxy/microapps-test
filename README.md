*DEMO* http://microapps-test.s3-website.eu-central-1.amazonaws.com/

`React` and `Redux` with immutable state are used as core technologies, `Less` as CSS precompiler. All code is written in ES6 syntax.

App is split into 3 main React components representing user actions: `DonationForm`, `PayonForm` and `Thanks` with addition of a log of donations in `Donations` component. Components are managed and connected to Redux store via `DonateContainer` component.

Transaction process is managed by `redux-thunk` and async action creators representing current transaction state.

`redux-localstorage` package is used to store state in localStorage.

Special module [`donationFreezer`](src/core/donationFreezer.js) observes current transaction state and setups timeout for disabling donations for 1 hour. 

Additionally there is [`payon`](src/core/donationFreezer.js) module that incapsulates Pay On API usage (such as making requests via fetch method and parsing and verifying result query on page load). 

`webpack-dev-server`, `redux hot reload`, `babel-loader`, `less-loader`, `eslint` and other dev tools are used in development.
