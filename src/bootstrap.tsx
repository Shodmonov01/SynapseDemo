import * as React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import { ShellProviders } from './app/providers/ShellProviders';
import './styles/global.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ShellProviders>
        <App />
      </ShellProviders>
    </React.StrictMode>,
  );
}
