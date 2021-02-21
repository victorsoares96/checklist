import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if(process.env.REACT_APP_MODE === 'development') serviceWorker.unregister();
else if(process.env.REACT_APP_MODE === 'production') serviceWorker.register();