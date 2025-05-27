import { createRoot } from 'react-dom/client';
import { App } from './App/App';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(<App />);
