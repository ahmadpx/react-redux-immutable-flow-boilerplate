import React from 'react';
import ReactDOM from 'react-dom';

import '../public/assets/scss/main.scss';

const App = () => (
  <h1>Hello world</h1>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(<App />);
  });
}
