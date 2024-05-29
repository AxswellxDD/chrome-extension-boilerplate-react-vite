import { createRoot } from 'react-dom/client';
import '@pages/panel/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import Panel from '@pages/panel/Panel';
import Demo from '../devtools/componnents/FormsValuesReader';

refreshOnUpdate('pages/panel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<Panel />)
}

init();

<Demo/>