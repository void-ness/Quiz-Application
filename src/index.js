import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './app/store';

import { MathJaxContext } from 'better-react-mathjax';

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"],
    ]
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MathJaxContext config={config}>
      <Provider store={store}>
        <App />
      </Provider>
    </MathJaxContext>
  </React.StrictMode>
);
