import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';



const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
    {/* <StarRating size={24} className='start-rating' maxRating={5} defaultRating={3} messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']} /> */}

  </StrictMode>
);

;
