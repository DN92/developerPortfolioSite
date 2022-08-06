import React from 'react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import FrontEndRoutes from './FrontEndRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <FrontEndRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
