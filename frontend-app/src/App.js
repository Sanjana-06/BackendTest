import React from 'react';
import FormComponent from './Components/FormComponent';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = '21BCE2700';
  }, []);
    return (
        <div className='App'>
            <FormComponent />
        </div>
    );
}

export default App;

