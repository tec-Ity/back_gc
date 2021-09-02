import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import App from './App';
import { store } from './store';
import zh_CN from './js/lang/zh_CN';
import en_US from './js/lang/en_US';
// import it_IT from './js/lang/it_IT';
const chooseLocale = ()=> {
  let lang = localStorage.getItem('lang');
  if(!lang) lang = navigator.language.split('_')[0];
  switch(lang) {
      case 'en': return en_US;
      case 'zh': return zh_CN;
      // case 'it': return it_IT;
      default: return zh_CN;
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider
        locale={'en'}
        messages={chooseLocale()}
      >
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);