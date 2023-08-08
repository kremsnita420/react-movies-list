import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import StarRating from './components/StarRating';
// import './index.css';
// import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating size={24} color='red' className='test' />
  </StrictMode>
);

;
